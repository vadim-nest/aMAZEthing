import '../../css/sorting.css';
import { useState, useEffect } from 'react';
import { insertionSortAlgo, generateArray } from '../../utils/sorting-algo';
import Visualization from './visualization';
import { useAlgo } from '../../features/hooks';
import { insertionSortVisual } from '../../utils/sorting-helper-visual';

export default function InsertionLesson() {
  const [array, setArray] = useState([3,5,7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]])
  const [isSorted, setIsSorted] = useState(false)

  let WIDTH = 35
  let MIN_VAL = 3
  let MAX_VAL = 50
  let NUM_BARS = 20
  let DELAY = 150
  let PADTOP = 10
  let MARGIN = 3
  let HEIGHT = 5

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
    setAnimations(useAlgo("insertion", copyArr, false))
  }, [array])

  function initArr() {
    setClicked(false)
    setIsSorted(false)
    setArray(array => array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL));
  }




  return (
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
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
        <Visualization   fontColor={'white'} width={WIDTH} delay={DELAY} margin={MARGIN} height={HEIGHT} paddingTop={PADTOP} array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={insertionSortVisual} setClicked={setClicked} setIsSorted={setIsSorted}/>
      </div>
    </div>
  );
}
