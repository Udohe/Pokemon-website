import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) setValue(JSON.parse(item));
    } catch {}
  }, [key]);

  const set = (val: T) => {
    try {
      setValue(val);
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  };

  const remove = () => {
    try {
      setValue(initialValue);
      localStorage.removeItem(key);
    } catch {}
  };

  return [value, set, remove] as const;
}
