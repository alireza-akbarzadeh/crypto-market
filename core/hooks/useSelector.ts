import {
  useSelector as defaultUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import type { RootState } from "@/core/redux";

const useSelector: TypedUseSelectorHook<RootState> = defaultUseSelector;
export default useSelector;
