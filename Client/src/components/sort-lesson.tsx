import "../css/sort-lesson.css";
import { useEffect, useState } from "react";
import { bubbleSortAlgo } from "../utils/sorting-algo";
// import bubbleSort from '../utils/'

export default function SortLesson() {
  const [array, setArray] = useState([5, 1, 4, 2, 8]);
  const [clicked, setClicked] = useState(false)
  // Should store all the text/arrays in the db and just reuse this component for every lesson
  // But we'll just write everything here for now
  // Took the info from geeksforgeeks.com

  const ARR_BAR_NUM = 8;

  let paragraphs = {
    sortName: "Bubble sort",
    firstP:
      "Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.",
    secondP:
      "First Pass: Bubble sort starts with very first two elements, comparing them to check which one is greater.",
  };

  // Write a nice view for the columns in the array

  //----------------------------------------------------------

  //random Array Gen func

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

  function bubbleSort() {
    setClicked(true)
    const copyArr = array.slice();
    const arrayStates = bubbleSortAlgo(copyArr);
    let i = 0;
    const bubbleInt = setInterval(() => {
      i++;
      console.log(arrayStates[i], i);
      setArray(arrayStates[i]);
      if (i === arrayStates.length - 1) {
        clearInterval(bubbleInt);
      }
    }, 200);
  
  }
  // let style = {
  //   'backgroundColor': 'green',
  //   'height': `${tempArr[0]}0px`
  // }
  // let style2 = {
  //   'backgroundColor': 'green',
  //   'height': `${tempArr[1]}0px`
  // }

  return (
    <>
      <div className="whole-page-wrapper">
        <div className="lesson-wrapper">
          {!clicked && <button onClick={bubbleSort}> click </button>}
          <h1>{paragraphs.sortName}</h1>
          <p>{paragraphs.firstP}</p>
          <p>{paragraphs.secondP}</p>
          <div className="array">
            {/* <div className='array-el' style={style}></div>
          <div className='array-el' style={style2}></div> */}
            {array.map((element, index) => (
              <div
                className="array-el"
                style={{
                  backgroundColor: "green",
                  height: `${element * 15}px`,
                }}
                key={index}
              >
                {" "}
                {element}{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
