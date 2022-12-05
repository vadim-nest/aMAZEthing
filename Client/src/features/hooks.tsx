import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from "../components/svg/animalsSVG";
import { bubbleSortAlgo, insertionSortAlgo, mergeSortAlgo, quickSortAlgo, selectionSortAlgo } from "../utils/sorting-algo";
import { minionType } from "../utils/types";
import { RootState, AppDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
//adding types to functions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;







export function useAlgo(algoName: string = 'bubble', array: any = [], reversed: boolean = false) {

    //const [animation,setAnimation] = useState<number[][]>([])

    switch (algoName) {
        case 'bubble':
            return bubbleSortAlgo(array, reversed);
            break; //can be deleted
        case 'insertion':
            return insertionSortAlgo(array, reversed);
            break;
        case 'selection':
            return selectionSortAlgo(array, reversed);
            break;
        case 'merge':
            return mergeSortAlgo(array, reversed);
            break;
        case 'quick':
            return quickSortAlgo(array, reversed);
            break;
    }
    return [[]]
}

export function whichAnimalSVG(minion: minionType) {
  return minion.type === 'Squirrel' ? (
    <Squirrel currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Badger' ? (
    <Badger currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Hare' ? (
    <Hare currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Deer' ? (
    <Deer currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Koala' ? (
    <Koala currentPlayer={`${minion.alignment}-color`} />
  ) : (
    minion.type === 'Bear' && (
      <Bear currentPlayer={`${minion.alignment}-color`} />
    )
  );
}
