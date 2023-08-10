import { EffectCallback, DependencyList, useEffect, useRef } from "react";

type CompareFunction<T> = (a: T, b?: T) => boolean;

function deepCompareEquals<T = any>(a: T, b?: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function useDeepCompareMemoize<T>(compareFunction: CompareFunction<T>) {
  return (value: T) => {
    const ref = useRef<T>();
    // it can be done by using useMemo as well
    // but useRef is rather cleaner and easier

    if (!compareFunction(value, ref.current)) {
      ref.current = value;
    }

    return ref.current;
  };
}

export default function useDeepCompareEffect<T = any>(
  callback: EffectCallback,
  dependencies: DependencyList,
  compareFunction: CompareFunction<T> = deepCompareEquals
) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize(compareFunction)));
}
