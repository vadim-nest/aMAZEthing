import { useEffect,useState } from "react";
import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { bubbleSortAlgo, insertionSortAlgo, mergeSortAlgo, quickSortAlgo, selectionSortAlgo } from "../utils/sorting-algo";
import {RootState, AppDispatch} from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
//adding types to functions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;







export function useAlgo(algoName:string = 'bubble', array: any = [], reversed:boolean = false) {
    
    //const [animation,setAnimation] = useState<number[][]>([])
    useEffect(()=>{
        switch(algoName){
            case 'bubble':
                return bubbleSortAlgo(array,reversed);
                break; //can be deleted
            case 'insertion':
                return insertionSortAlgo(array,reversed);
                break;
            case 'selection':
                return selectionSortAlgo(array,reversed);
                break;
            case 'merge':
                return mergeSortAlgo(array,reversed);
                break;
            case 'quick':
                return quickSortAlgo(array,reversed);
                break;
        }
    },[])
    return [[]] 
  }