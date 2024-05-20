import { useState, useEffect } from 'react';

function SessionStorageHook(key: string) {
  const [value, setValue] = useState(() => {
    const jsonValue = sessionStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return null;
  });

  useEffect(() => {
    if (value === null) {
      sessionStorage.setItem('cart', JSON.stringify([]));
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

export default SessionStorageHook;
