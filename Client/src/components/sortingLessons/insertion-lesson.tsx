import '../../css/sorting.css';
import { useState, useEffect } from 'react';
import { insertionSortAlgo, generateArray } from '../../utils/sorting-algo';
import Visualization from './visualization';

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
    setArray(array => array = generateArray(5))
  }, [])

  useEffect(() => {
    console.log(array)
    const copyArr = array.slice()
    setAnimations(insertionSortAlgo(copyArr))
  }, [array])

  function initArr(ARR_BARS:number) {
    setClicked(false)
    setArray(array => array = generateArray(ARR_BARS));
  }
  

  async function insertionSort() {

    for (let i = 0; i < animations.length; i++) {
      await delay(300);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--red)';

        
        document.getElementById(
          `${indexOne}`
        )!.style.transform += `translateX(-60px)`;
        document.getElementById(
          `${indexTwo}`
        )!.style.transform += `translateX(60px)`;

        await delay(300);
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)';
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--main-green)';


        let tempNode = document.getElementById(`${indexTwo}`);
        document.getElementById(`${indexOne}`)!.id = `${indexTwo}`;
        tempNode!.id = `${indexOne}`;
      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)';
        await delay(300);
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)';
      }
    }
  }

  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
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
        <Visualization array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={insertionSort}/>
      </div>
    </div>
  );
}
