import '../../css/sort-lesson.css';
import { useState } from 'react';
import bubbleSortAlgo from '../../utils/sorting-algo';

export default function BubbleLesson() {
  const [array, setArray] = useState([5, 1, 1, 3, 6, 5, 4, 2, 8]);
  const [clicked, setClicked] = useState(false)
  // Should store all the text/arrays in the db and just reuse this component for every lesson
  // But we'll just write everything here for now
  // Took the info from geeksforgeeks.com
  let paragraphs = {
    sortName: 'Bubble sort',
    firstP:
      'Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. As we go through each element, if the current element is bigger than the next one, we swap them. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.',
  };

  // Write a nice view for the columns in the array

  //----------------------------------------------------------

  // random Array Gen func

  // function genereateArray() {
  //   const array = []
  //   for(let i = 0; i<ARR_BAR_NUM; i++) {
  //     array.push(randomNumGen(3, 18))
  //   }
  //   setArray(array)
  // }

  // function randomNumGen(min:number, max:number) {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

  //---------------------------------------------------------------------------

  // Animation to swap them

  async function bubbleSort() {
    setClicked(true);
    const copyArr = array.slice();
    const {ArrayStates, animations} = bubbleSortAlgo(copyArr);
    console.log(animations)
    for(let i = 0; i<animations.length; i++) {
      await delay(500)
      if(animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'red'
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'red'
        document.getElementById(`${indexOne}`)!.style.transform += `translateX(40px)`
        document.getElementById(`${indexTwo}`)!.style.transform += `translateX(-40px)`
        await delay(500)
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'green'
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'green'
        let tempNode =  document.getElementById(`${indexTwo}`) 
        document.getElementById(`${indexOne}`)!.id = `${indexTwo}`
        tempNode!.id =`${indexOne}`
      } else {
        const [indexOne, elementOne] = animations[i]
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'red'
        await delay(500)
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'green'

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
          {!clicked ? (
            <button className="button clickSort" onClick={bubbleSort}>
              visualize 
            </button>
          ) : 
            <button className="button clickSort-clicked" onClick={() => window.location.reload()}>
                refresh the page {/*refresh to visualize again after the array is sorted*/}
            </button>
          }
        </div>
        <div className="array">
          {array.map((element, index) => (
            <div
              className={`array-el`}
              style={{
                backgroundColor: 'var(--main-green)',
                height: `${element * 20}px`,
              }}
              id={`${index}`}
              key={index}
            >
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
