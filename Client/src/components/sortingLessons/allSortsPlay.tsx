import "../../css/allSortsPlay.css";
import Visualization from "./visualization";

import {
  bubbleSortVisual,
  insertionSortVisual,
  mergeSortVisual,
  selectionSortVisual,
  quickSortVisual,
} from "../../utils/sorting-helper-visual";
import {
  bubbleSortAlgo,
  insertionSortAlgo,
  mergeSortAlgo,
  selectionSortAlgo,
  quickSortAlgo,
  generateArray
} from "../../utils/sorting-algo";
import { useState, useEffect, useRef } from "react";

export default function AllSortsPlay() {
  const [array, setArray] = useState(generateArray(20,  10, 150))
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState(bubbleSortAlgo(array.slice, false));
  const [isSorted, setIsSorted] = useState(false);
  const [choiceOfAlgo, setChoiceOfAlgo] = useState(null as any)
  const [DELAY, setDELAY] = useState(5)

  let WIDTH = `${1451.23/array.length}` ;
  let MIN_VAL = 10;
  let MAX_VAL = 150;
  let PADTOP = 10;
  let MARGIN = 0.3;
  let HEIGHT = 3;

  function algoChosen(choice:string) {
    const copyArr = array.slice()
    if(choice === 'Bubble')  {
      setAnimations(bubbleSortAlgo(copyArr, false));
    }
    if(choice === 'Insertion')  {
      setAnimations(insertionSortAlgo(copyArr, false));
    }
    if(choice === 'Selection')  {
      setAnimations(selectionSortAlgo(copyArr, false));
    }
    if(choice === 'Merge')  {
      setAnimations(mergeSortAlgo(copyArr, false));
    }
    if(choice === 'Quick')  {
      setAnimations(quickSortAlgo(copyArr, false));
    }
  }

  useEffect(() => {
    algoChosen(choiceOfAlgo)
  }, [choiceOfAlgo, array]);

  function initArr(NUM_BARS:number) {
    console.log(NUM_BARS)
    setArray(generateArray(NUM_BARS, MIN_VAL, MAX_VAL));
  }

  function initSpeed(NUM_DELAY:any) {
    console.log(NUM_DELAY)
    setDELAY(NUM_DELAY)
  }


  return (
    <div className="playContainer">
      <div className="formContainer">
          <label>
            Array Size
            <input type="range"  name="array-size" value={array.length}
         min="8" max="100" onChange={(e) => initArr(e.target.valueAsNumber)} />
          </label>

          
          <label>
            Delay
            <input type="range" name="speed" step="5" value={DELAY}  min="5" max="50" onChange={(e) => initSpeed(e.target.valueAsNumber)}/>
          </label>


          <label className="sorting-label">
            Sorting Algorithms
         
          <select id="sorts" onChange={(e) => setChoiceOfAlgo(e.target.value)}>
             <option value= 'Bubble' >
              Bubble
            </option >

            <option value= 'Insertion' >
              Insertion
            </option >

            <option value= 'Selection' >
              Selection
            </option >

            <option value= 'Merge' >
              Merge
            </option >

            <option value= 'Quick' >
              Quick
            </option >
          </select>
          </label>

          {!isSorted && (
            <button
              className="button clickSort"
              onClick={() => {
                setClicked(true);
              }}
            >
              visualize
            </button>
          )}

      </div>
      <Visualization 
       width={WIDTH}
          delay={DELAY}
          margin={MARGIN}
          paddingTop={PADTOP}
          array={array}
          height={HEIGHT}
          fontColor={'white'}
          fontSize={9}
          animations={animations}
          clicked={clicked}
          sortingAlgo={
            choiceOfAlgo === 'Bubble' ? bubbleSortVisual :
            choiceOfAlgo === 'Insertion' ? insertionSortVisual :
            choiceOfAlgo === 'Selection' ? selectionSortVisual :
            choiceOfAlgo === 'Merge' ? mergeSortVisual :
            quickSortVisual
          }
          />
    </div>
  );
}
