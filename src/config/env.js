const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseBoolean = (value, fallback = false) => {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'boolean') return value;
  const normalized = String(value).toLowerCase().trim();
  if (['true', '1', 'yes', 'y'].includes(normalized)) return true;
  if (['false', '0', 'no', 'n'].includes(normalized)) return false;
  return fallback;
};

const withDefault = (value, fallback = '') => (value !== undefined && value !== '' ? value : fallback);

const env = {
  apiBaseUrl: withDefault(import.meta.env.VITE_API_BASE_URL, 'https://api.psycheprep.local'),
  authServiceUrl: withDefault(import.meta.env.VITE_AUTH_SERVICE_URL, 'https://auth.psycheprep.local'),
  auditLogEndpoint: withDefault(
    import.meta.env.VITE_AUDIT_LOG_ENDPOINT,
    `${withDefault(import.meta.env.VITE_API_BASE_URL, 'https://api.psycheprep.local')}/audit-log`
  ),
  mailProviderKey: withDefault(import.meta.env.VITE_MAIL_PROVIDER_KEY),
  mailFromAddress: withDefault(import.meta.env.VITE_MAIL_FROM_ADDRESS, 'otp@psycheprep.app'),
  otpExpiryMinutes: parseNumber(import.meta.env.VITE_OTP_EXPIRY_MINUTES, 2),
  otpLength: parseNumber(import.meta.env.VITE_OTP_LENGTH, 6),
  paymentPublicKey: withDefault(import.meta.env.VITE_PAYMENT_PUBLIC_KEY),
  paymentWebhookSecret: withDefault(import.meta.env.VITE_PAYMENT_WEBHOOK_SECRET),
  analyticsWriteKey: withDefault(import.meta.env.VITE_ANALYTICS_WRITE_KEY),
  proctoringSocketUrl: withDefault(import.meta.env.VITE_PROCTORING_SOCKET_URL),
  incidentWebhookUrl: withDefault(import.meta.env.VITE_INCIDENT_WEBHOOK_URL),
  ipLookupEndpoint: withDefault(import.meta.env.VITE_IP_LOOKUP_ENDPOINT, 'https://api64.ipify.org?format=json'),
  sessionTtlMinutes: parseNumber(import.meta.env.VITE_SESSION_TTL_MINUTES, 180),
  ipLockMinutes: parseNumber(import.meta.env.VITE_IP_LOCK_MINUTES, 180),
  heartbeatEndpoint: withDefault(import.meta.env.VITE_HEARTBEAT_ENDPOINT),
  heartbeatIntervalSeconds: parseNumber(import.meta.env.VITE_HEARTBEAT_INTERVAL_SECONDS, 45),
  screenshotWebhookUrl: withDefault(import.meta.env.VITE_SCREENSHOT_WEBHOOK),
  deviceFingerprintSalt: withDefault(import.meta.env.VITE_DEVICE_FINGERPRINT_SALT, 'psycheprep-demo'),
  devtoolsSensitivity: parseNumber(import.meta.env.VITE_DEVTOOLS_SENSITIVITY, 120),
  requireCamera: parseBoolean(import.meta.env.VITE_REQUIRE_CAMERA, true),
  geofenceLat: Number(import.meta.env.VITE_GEOFENCE_LAT) || null,
  geofenceLng: Number(import.meta.env.VITE_GEOFENCE_LNG) || null,
  geofenceRadiusKm: parseNumber(import.meta.env.VITE_GEOFENCE_RADIUS_KM, 10)
};

export default env;
