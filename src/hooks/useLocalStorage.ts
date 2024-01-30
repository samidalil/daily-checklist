import { useCallback, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T | ((storedValue?: unknown) => T),
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const getValue = (item?: unknown) => {
      if (initialValue instanceof Function) {
        const value = initialValue(item);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(value));
        }
        return value;
      }

      if (!item) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(initialValue));
        }
        return initialValue;
      }

      return item as T;
    };

    if (typeof window === "undefined") {
      return getValue();
    }

    try {
      const item = window.localStorage.getItem(key);

      return item ? getValue(JSON.parse(item)) : getValue();
    } catch (e) {
      console.error(e);
      return getValue();
    }
  });

  const setValue = useCallback(
    (value: T | ((value: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (e) {
        console.log(e);
      }
    },
    [key, storedValue, setStoredValue],
  );

  return [storedValue, setValue] as const;
}
