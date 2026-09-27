'use client';

import { useEffect, useRef } from 'react';

export function useIdleTimeout(onIdle: () => void, idleTime = 8 * 60 * 60 * 1000) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleActivity = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onIdle();
      }, idleTime);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    handleActivity(); // Initialize

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [onIdle, idleTime]);
}
