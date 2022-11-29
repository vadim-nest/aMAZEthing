import '../../css/sorting.css';
import { useState, useEffect } from 'react';
import { insertionSortAlgo, generateArray } from '../../utils/sorting-algo';
import Visualization from './visualization';
import { insertionSortVisual } from '../../utils/sorting-helper-visual';

export default function InsertionLesson() {
  const [array, setArray] = useState([3,5,7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]])

  let paragraphs = {
    sortName: 'Insertion sort',
    firstP:
      'Starts on one side and compares two first items, sorts them and moves on to the next item checking if it is smaller than the previous items and places it in its place. Worst time complexity O(N^2). ',
  };

  useEffect(() => {
    setArray(array => array = generateArray(15))
  }, [])

  useEffect(() => {
    console.log(array)
    const copyArr = array.slice()
    setAnimations(insertionSortAlgo(copyArr, true))
  }, [array])

  function initArr(ARR_BARS:number) {
    setClicked(false)
    setArray(array => array = generateArray(ARR_BARS));
  }
  



  return (
    <div className="whole-page-wrapper">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>

      <div className="lesson-wrapper-2">
      <div>
          <button className='button clickSort' onClick={() => initArr(15)}> new array </button>
          {!clicked && 
            <button className="button clickSort" onClick={() => setClicked(true)}>
              visualize
            </button>
          }
        </div>
        <Visualization width={30} delay={200} margin={5} paddingTop={10} array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={insertionSortVisual}/>
      </div>
    </div>
  );
}
