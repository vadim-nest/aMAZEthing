import '../../css/sorting.css';
import { useEffect, useState } from 'react';
import { mergeSortAlgo, generateArray } from '../../utils/sorting-algo';
import Visualization from './visualization';
import { mergeSortVisual} from '../../utils/sorting-helper-visual';

export default function MergeLesson() {
  const [array, setArray] = useState([3,5,7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]])
  const [isSorted, setIsSorted] = useState(false)

  let WIDTH = 35
  let MIN_VAL = 10
  let MAX_VAL = 100
  let NUM_BARS = 25
  let DELAY = 5
  let PADTOP = 10
  let MARGIN = 3
  let HEIGHT = 3

  let paragraphs = {
    sortName: 'Merge sort',
    firstP:
      'Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. As we go through each element, if the current element is bigger than the next one, we swap them. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.',
  };


  useEffect(() => {
    setArray(array => array =generateArray(NUM_BARS, MIN_VAL, MAX_VAL))
  }, [])

  useEffect(() => {
    console.log(array)
    const copyArr = array.slice()
    setAnimations(mergeSortAlgo(copyArr, true))
  }, [array])

  function initArr() {
    setClicked(false)
    setIsSorted(false)
    setArray(array => array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL));
  }

 

  return (
    <div className="whole-page-wrapper">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>

      <div className="lesson-wrapper-2">
        <div>
        {!clicked && 
           < button className="button clickSort" onClick={() => initArr()}>
            new array
          </button>}

          {!clicked &&!isSorted &&
            <button
              className="button clickSort"
              onClick={() => {
                setClicked(true);
              }}
            >
              visualize
            </button>
          }


          {!isSorted && clicked &&
           <button 
           className="button clickSort">
             wait... </button>
          }

        </div>
        
        <Visualization   fontColor={'white'} width={WIDTH} delay={DELAY} margin={MARGIN} paddingTop={PADTOP} height={HEIGHT} array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={mergeSortVisual}  setClicked={setClicked}   setIsSorted={ setIsSorted}  />

      </div>
    </div>
  );
}
