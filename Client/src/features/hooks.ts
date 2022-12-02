import { useEffect,useState } from "react";
import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { bubbleSortAlgo } from "../utils/sorting-algo";
import {RootState, AppDispatch} from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
//adding types to functions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAlgo(algoName:string = 'bubble', array: number[] = [], reversed:boolean = false) {
    
    const [animation,setAnimation] = useState<number[][]>([])
    
    useEffect(()=>{
        switch(algoName){
            case 'bubble':
                setAnimation(bubbleSortAlgo(array,reversed));
        }
    },[])
  
    return animation 
  }