import { useEffect, useState } from "react";

function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedVale] = useState();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVale(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
