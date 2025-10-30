import { useEffect, useMemo, useRef, useState } from 'react';

const formatDuration = (milliseconds) => {
  if (milliseconds <= 0) return '00:00:00';
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const useCountdown = (minutes, { onExpire } = {}) => {
  const [remaining, setRemaining] = useState(() => minutes * 60 * 1000);
  const endTimeRef = useRef(Date.now() + minutes * 60 * 1000);

  useEffect(() => {
    endTimeRef.current = Date.now() + minutes * 60 * 1000;
    setRemaining(minutes * 60 * 1000);
  }, [minutes]);

  useEffect(() => {
    const tick = () => {
      const delta = endTimeRef.current - Date.now();
      setRemaining(delta);
      if (delta <= 0) {
        clearInterval(interval);
        onExpire?.();
      }
    };
    const interval = setInterval(tick, 1000);
    tick();
    return () => clearInterval(interval);
  }, [onExpire]);

  const formatted = useMemo(() => formatDuration(Math.max(remaining, 0)), [remaining]);

  return { remaining: Math.max(remaining, 0), formatted };
};

export default useCountdown;
