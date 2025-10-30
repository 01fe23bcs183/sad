import { useCallback, useEffect, useRef, useState } from 'react';
import env from '../config/env.js';

const INCIDENT_CODES = {
  EXIT_FULLSCREEN: 'EXIT_FULLSCREEN',
  VISIBILITY_CHANGE: 'VISIBILITY_CHANGE',
  NETWORK_DROP: 'NETWORK_DROP',
  SHORTCUT: 'SHORTCUT',
  IP_CONFLICT: 'IP_CONFLICT',
  CONTEXT_MENU: 'CONTEXT_MENU',
  CLIPBOARD: 'CLIPBOARD_INTERACTION',
  RESIZE: 'WINDOW_RESIZE',
  DEVTOOLS: 'DEVTOOLS_DETECTED',
  GEO_VIOLATION: 'GEOFENCE_BREACH',
  CAMERA_BLOCKED: 'CAMERA_BLOCKED',
  BEFORE_UNLOAD: 'BEFORE_UNLOAD',
  HEARTBEAT_FAILURE: 'HEARTBEAT_FAILURE',
  SCREENSHOT: 'SCREENSHOT_ATTEMPT'
};

const textEncoder = typeof window !== 'undefined' && window.TextEncoder ? new window.TextEncoder() : null;

const digestMessage = async (message) => {
  if (typeof window === 'undefined' || !window.crypto?.subtle || !textEncoder) {
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      return window.btoa(message);
    }
    return message;
  }
  const data = textEncoder.encode(message);
  const hash = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

const haversineDistanceKm = (origin, target) => {
  if (!origin || !target) return null;
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth radius in km
  const dLat = toRad(target.lat - origin.lat);
  const dLon = toRad(target.lng - origin.lng);
  const lat1 = toRad(origin.lat);
  const lat2 = toRad(target.lat);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const useExamSecurity = ({ onIncident, onLockdown }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const [networkOnline, setNetworkOnline] = useState(true);
  const [ipAddress, setIpAddress] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);
  const [withinGeofence, setWithinGeofence] = useState(true);
  const [cameraVerified, setCameraVerified] = useState(!env.requireCamera);
  const [lastHeartbeat, setLastHeartbeat] = useState(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState(null);
  const sessionRef = useRef({ incidents: [], lockdown: false, ip: null, fingerprint: null });
  const heartbeatRef = useRef(null);
  const devtoolsRef = useRef(null);

  useEffect(() => {
    const fetchIp = async () => {
      if (!env.ipLookupEndpoint) return;
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 2000);
        const res = await fetch(env.ipLookupEndpoint, { signal: controller.signal });
        clearTimeout(timeout);
        const data = await res.json();
        setIpAddress(data.ip);
        sessionRef.current.ip = data.ip;
        sessionRef.current.lockedAt = Date.now();
      } catch (error) {
        console.warn('IP fetch failed', error);
      }
    };
    fetchIp();
  }, []);

  useEffect(() => {
    const computeFingerprint = async () => {
      try {
        const fingerprintPayload = [
          typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown-agent',
          typeof navigator !== 'undefined' ? navigator.language : 'unknown-language',
          window.screen?.width,
          window.screen?.height,
          window.screen?.colorDepth,
          env.deviceFingerprintSalt
        ].join('::');
        const digest = await digestMessage(fingerprintPayload);
        setDeviceFingerprint(digest);
        sessionRef.current.fingerprint = digest;
      } catch (error) {
        console.warn('Fingerprint generation failed', error);
      }
    };
    if (typeof window !== 'undefined') {
      computeFingerprint();
    }
  }, []);

  useEffect(() => {
    if (!env.requireCamera || typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return;
    }
    let cancelled = false;
    const verifyCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (!cancelled) {
          setCameraVerified(true);
        }
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        if (!cancelled) {
          setCameraVerified(false);
          addIncident(INCIDENT_CODES.CAMERA_BLOCKED, { message: error.message });
          lockSession();
        }
      }
    };
    verifyCamera();
    return () => {
      cancelled = true;
    };
  }, [addIncident, lockSession]);

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    const geoSuccess = (position) => {
      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setGeoLocation(coords);
      if (env.geofenceLat !== null && env.geofenceLng !== null) {
        const distance = haversineDistanceKm(coords, { lat: env.geofenceLat, lng: env.geofenceLng });
        const inside = distance === null ? true : distance <= env.geofenceRadiusKm;
        setWithinGeofence(Boolean(inside));
        if (!inside) {
          addIncident(INCIDENT_CODES.GEO_VIOLATION, { distanceKm: distance });
          lockSession();
        }
      }
    };
    const geoError = (error) => {
      console.warn('Geolocation failed', error);
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, { enableHighAccuracy: true, timeout: 5000 });
  }, [addIncident, lockSession]);

  const transmitIncident = useCallback((incident) => {
    const targets = [env.incidentWebhookUrl, env.auditLogEndpoint].filter(Boolean);
    if (targets.length === 0) return;
    const payload = JSON.stringify({
      ...incident,
      ip: sessionRef.current.ip,
      sessionLock: sessionRef.current.lockdown,
      occurredAt: new Date(incident.timestamp).toISOString()
    });
    targets.forEach((target) => {
      try {
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          navigator.sendBeacon(target, payload);
        } else {
          fetch(target, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true
          }).catch(() => {});
        }
      } catch (error) {
        console.warn('Incident webhook failed', error);
      }
    });
  }, []);

  const addIncident = useCallback(
    (code, meta = {}) => {
      const incident = { code, meta, timestamp: Date.now() };
      sessionRef.current.incidents.push(incident);
      onIncident?.(incident);
      transmitIncident(incident);
    },
    [onIncident, transmitIncident]
  );

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return undefined;
    const fullscreenHandler = () => {
      const isFull = Boolean(document.fullscreenElement);
      setIsFullscreen(isFull);
      if (!isFull) {
        addIncident(INCIDENT_CODES.EXIT_FULLSCREEN);
      }
    };

    const visibilityHandler = () => {
      const focused = document.visibilityState === 'visible';
      setIsFocused(focused);
      if (!focused) {
        addIncident(INCIDENT_CODES.VISIBILITY_CHANGE, { state: document.visibilityState });
      }
    };

    const keydownHandler = (event) => {
      const shortcuts = ['Escape', 'F11', 'F5'];
      if (event.key === 'Tab' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        addIncident(INCIDENT_CODES.SHORTCUT, { key: 'CTRL/CMD+TAB' });
        return;
      }
      if (shortcuts.includes(event.key) || event.metaKey || event.ctrlKey) {
        event.preventDefault();
        addIncident(INCIDENT_CODES.SHORTCUT, { key: event.key });
      }
      if (event.key === 'PrintScreen') {
        addIncident(INCIDENT_CODES.SCREENSHOT);
        if (env.screenshotWebhookUrl) {
          const payload = JSON.stringify({
            timestamp: Date.now(),
            ip: sessionRef.current.ip,
            fingerprint: sessionRef.current.fingerprint
          });
          if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
            navigator.sendBeacon(env.screenshotWebhookUrl, payload);
          } else if (typeof fetch === 'function') {
            fetch(env.screenshotWebhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: payload,
              keepalive: true
            }).catch(() => {});
          }
        }
      }
    };

    const onlineHandler = () => setNetworkOnline(true);
    const offlineHandler = () => {
      setNetworkOnline(false);
      addIncident(INCIDENT_CODES.NETWORK_DROP);
    };

    const resizeHandler = () => {
      addIncident(INCIDENT_CODES.RESIZE, { width: window.innerWidth, height: window.innerHeight });
    };

    const contextMenuHandler = (event) => {
      event.preventDefault();
      addIncident(INCIDENT_CODES.CONTEXT_MENU);
    };

    const clipboardHandler = (event) => {
      addIncident(INCIDENT_CODES.CLIPBOARD, { type: event.type });
    };

    const beforeUnloadHandler = (event) => {
      event.preventDefault();
      event.returnValue = '';
      addIncident(INCIDENT_CODES.BEFORE_UNLOAD);
    };

    document.addEventListener('fullscreenchange', fullscreenHandler);
    document.addEventListener('visibilitychange', visibilityHandler);
    window.addEventListener('keydown', keydownHandler, true);
    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);
    window.addEventListener('resize', resizeHandler);
    document.addEventListener('contextmenu', contextMenuHandler);
    document.addEventListener('copy', clipboardHandler);
    document.addEventListener('cut', clipboardHandler);
    document.addEventListener('paste', clipboardHandler);
    window.addEventListener('beforeunload', beforeUnloadHandler);

    fullscreenHandler();
    visibilityHandler();

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenHandler);
      document.removeEventListener('visibilitychange', visibilityHandler);
      window.removeEventListener('keydown', keydownHandler, true);
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
      window.removeEventListener('resize', resizeHandler);
      document.removeEventListener('contextmenu', contextMenuHandler);
      document.removeEventListener('copy', clipboardHandler);
      document.removeEventListener('cut', clipboardHandler);
      document.removeEventListener('paste', clipboardHandler);
      window.removeEventListener('beforeunload', beforeUnloadHandler);
    };
  }, [addIncident]);

  useEffect(() => {
    if (!env.devtoolsSensitivity || typeof window === 'undefined') return undefined;
    const detectDevtools = () => {
      const threshold = env.devtoolsSensitivity;
      const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
      const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
      if (widthDiff > threshold || heightDiff > threshold) {
        addIncident(INCIDENT_CODES.DEVTOOLS, { widthDiff, heightDiff });
        lockSession();
      }
    };
    devtoolsRef.current = setInterval(detectDevtools, 2000);
    return () => {
      if (devtoolsRef.current) {
        clearInterval(devtoolsRef.current);
      }
    };
  }, [addIncident, lockSession]);

  useEffect(() => {
    if (!env.heartbeatEndpoint || !env.heartbeatIntervalSeconds || typeof window === 'undefined') return undefined;
    const sendHeartbeat = async () => {
      try {
        const payload = {
          timestamp: Date.now(),
          ip: sessionRef.current.ip,
          fingerprint: sessionRef.current.fingerprint,
          incidents: sessionRef.current.incidents.length
        };
        const body = JSON.stringify(payload);
        if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
          navigator.sendBeacon(env.heartbeatEndpoint, body);
        } else if (typeof fetch === 'function') {
          await fetch(env.heartbeatEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
            keepalive: true
          });
        }
        setLastHeartbeat(Date.now());
      } catch (error) {
        addIncident(INCIDENT_CODES.HEARTBEAT_FAILURE, { message: error.message });
      }
    };
    heartbeatRef.current = setInterval(sendHeartbeat, env.heartbeatIntervalSeconds * 1000);
    sendHeartbeat();
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
    };
  }, [addIncident]);

  const requestFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    }
  }, []);

  const releaseFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  }, []);

  const lockSession = useCallback(() => {
    sessionRef.current.lockdown = true;
    sessionRef.current.lockedAt = Date.now();
    onLockdown?.();
  }, [onLockdown]);

  const verifyIp = useCallback(
    (expectedIp) => {
      if (!expectedIp || !sessionRef.current.ip) return true;
      if (env.ipLockMinutes) {
        const expiry = (sessionRef.current.lockedAt || Date.now()) + env.ipLockMinutes * 60 * 1000;
        if (Date.now() > expiry) {
          sessionRef.current.lockdown = false;
          return true;
        }
      }
      const matches = expectedIp === sessionRef.current.ip;
      if (!matches) {
        addIncident(INCIDENT_CODES.IP_CONFLICT, { expectedIp, actualIp: sessionRef.current.ip });
        lockSession();
      }
      return matches;
    },
    [addIncident, lockSession]
  );

  return {
    isFullscreen,
    isFocused,
    networkOnline,
    ipAddress,
    geoLocation,
    withinGeofence,
    cameraVerified,
    lastHeartbeat,
    deviceFingerprint,
    requestFullscreen,
    releaseFullscreen,
    verifyIp
  };
};
