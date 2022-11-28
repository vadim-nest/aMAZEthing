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
      'Insertion Sort is also a simple sorting algorithm that swaps two elements if they are in the wrong order. As we go through each element, if the current element is smaller than the previous one, the elements are swapped. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.',
  };

  useEffect(() => {
    setArray(array => array = generateArray(225))
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
          <button className='button clickSort' onClick={() => initArr(5)}> new array </button>
          {!clicked && 
            <button className="button clickSort" onClick={() => setClicked(true)}>
              visualize
            </button>
          }
        </div>
        <Visualization width={3}array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={insertionSortVisual}/>
      </div>
    </div>
  );
}
