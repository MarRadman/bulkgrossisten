import { useState, useEffect } from 'react';

function useSessionStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = sessionStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return initialValue;
  });

  useEffect(() => {
    if (value === null) {
      sessionStorage.setItem(key, JSON.stringify(initialValue));
    } else {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, initialValue]);

  return [value, setValue];
}

export default useSessionStorage;
