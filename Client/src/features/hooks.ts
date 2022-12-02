import { useEffect,useState } from "react";
import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { bubbleSortAlgo } from "../utils/sorting-algo";
import {RootState, AppDispatch} from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
//adding types to functions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;







function useAlgo(algoName:string = 'bubble', array: any = [], reversed:boolean = false) {
    
    const [animation,setAnimation] = useState([])
    
    useEffect(()=>{
        switch(algoName){
            case 'bubble':
                setAnimation(bubbleSortAlgo(array,reversed) as any);
        }
    },[])
  
    return animation 
  }