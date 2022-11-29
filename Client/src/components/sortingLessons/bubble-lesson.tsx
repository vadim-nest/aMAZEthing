import '../../css/sorting.css';
import { useEffect, useState } from 'react';
import { bubbleSortAlgo, generateArray } from '../../utils/sorting-algo';
import Visualization from './visualization';
import { bubbleSortVisual } from '../../utils/sorting-helper-visual';

export default function BubbleLesson() {
  const [array, setArray] = useState([3,5,7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]])
  let paragraphs = {
    sortName: 'Bubble sort',
    firstP:
      'Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. As we go through each element, if the current element is bigger than the next one, we swap them. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.',
  };


  useEffect(() => {
    setArray(array => array = generateArray(12))
  }, [])

  useEffect(() => {
    console.log(array)
    const copyArr = array.slice()
    setAnimations(bubbleSortAlgo(copyArr, false))
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
        <button className='button clickSort' onClick={() => initArr(12)}> new array </button>
          {!clicked && 
            <button className="button clickSort" onClick={() =>{
              setClicked(true)}}>
              visualize
            </button>
          }
        </div>
        <Visualization width={40} delay={10} margin={5} paddingTop={10}  array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={bubbleSortVisual}/>

      </div>
    </div>
  );
}
