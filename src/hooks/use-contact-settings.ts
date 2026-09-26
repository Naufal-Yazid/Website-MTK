'use client';

import { useEffect, useState } from 'react';
import { DEFAULT_CONTACT_SETTINGS, type ResolvedContactSettings } from '@/lib/contact-settings';

export function useContactSettings() {
  const [settings, setSettings] = useState<ResolvedContactSettings>(DEFAULT_CONTACT_SETTINGS);

  useEffect(() => {
    let ignore = false;
    fetch('/api/contact-settings')
      .then((response) => response.json())
      .then((data: ResolvedContactSettings) => {
        if (!ignore) setSettings(data);
      })
      .catch(() => undefined);

    return () => {
      ignore = true;
    };
  }, []);

  return settings;
}
