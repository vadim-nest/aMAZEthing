import '../../css/sorting.css';
import { useState, useEffect } from 'react';
import { insertionSortAlgo, generateArray } from '../../utils/sorting-algo';
import Visualization from './visualization';
import { insertionSortVisual } from '../../utils/sorting-helper-visual';

export default function InsertionLesson() {
  const [array, setArray] = useState([3,5,7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]])
  const [isSorted, setIsSorted] = useState(false)

  let WIDTH = 40
  let MIN_VAL = 3
  let MAX_VAL = 20
  let NUM_BARS = 12
  let DELAY = 10
  let PADTOP = 10
  let MARGIN = 5

  let paragraphs = {
    sortName: 'Insertion sort',
    firstP:
      'Starts on one side and compares two first items, sorts them and moves on to the next item checking if it is smaller than the previous items and places it in its place. Worst time complexity O(N^2). ',
  };

  useEffect(() => {
    setArray(array => array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL))
  }, [])

  useEffect(() => {
    console.log(array)
    const copyArr = array.slice()
    setAnimations(insertionSortAlgo(copyArr, true))
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
        </div>
        <Visualization width={WIDTH} delay={DELAY} margin={MARGIN} paddingTop={PADTOP} array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={insertionSortVisual} setClicked={setClicked} setIsSorted={setIsSorted}/>
      </div>
    </div>
  );
}
