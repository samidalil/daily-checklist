import { useCallback, useState } from "react";

export default function useToggler(initialValue: boolean) {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((value) => !value), [setValue]);

  return [value, toggle, setValue] as const;
}
