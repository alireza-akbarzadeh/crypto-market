import { useDispatch as defUseDispatch } from "react-redux";
import type { AppDispatch } from "@/core/redux";

const useDispatch = () => defUseDispatch<AppDispatch>();
export default useDispatch;
