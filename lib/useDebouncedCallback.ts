"use client";

import { useEffect, useRef } from "react";

/** Returns a debounced version of `fn` that fires `delay` ms after the last call. */
export function useDebouncedCallback<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number
) {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => () => clearTimeout(timer.current), []);

  return (...args: A) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fnRef.current(...args), delay);
  };
}
