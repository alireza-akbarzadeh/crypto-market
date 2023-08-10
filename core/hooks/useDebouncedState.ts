import { Dispatch, SetStateAction, useState } from "react";
import { useDebouncedEffect } from ".";

export default function useDebouncedState<T = any>(
  initialValue: T,
  delay = 500
) {
  const [tempState, setTempState] = useState<T>(initialValue);
  const [state, setState] = useState<T>(initialValue);

  useDebouncedEffect(
    () => {
      setState(tempState);
    },
    delay,
    [tempState]
  );
  return [tempState, state, setTempState, setState] as [
    T,
    T,
    Dispatch<SetStateAction<T>>,
    Dispatch<SetStateAction<T>>
  ];
}
