import { DependencyList, useRef, useMemo } from "react";

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

export default function useDeepCompareMemo<R = any, T = any>(
  callback: () => R,
  dependencies: DependencyList,
  compareFunction: CompareFunction<T> = deepCompareEquals
) {
  return useMemo<R>(
    callback,
    dependencies.map(useDeepCompareMemoize(compareFunction))
  );
}
