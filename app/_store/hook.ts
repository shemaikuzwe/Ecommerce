import { useDispatch, useSelector,useStore } from "react-redux";
import { RootState,AppDispatch,AppStore } from "./store";

export const useAppDispatch=useDispatch.withTypes<AppDispatch>();
export const useAppSelector=useSelector.withTypes<RootState>();
export const useAppStore=useSelector.withTypes<AppStore>();