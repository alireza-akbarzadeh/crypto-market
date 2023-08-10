import { useEffect, useCallback, EffectCallback, DependencyList } from "react";

export default function useDebouncedEffect(
  effect: EffectCallback,
  delay: number,
  deps: DependencyList
) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}
