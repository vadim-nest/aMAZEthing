import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import {RootState, AppDispatch} from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
//adding types to functions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
