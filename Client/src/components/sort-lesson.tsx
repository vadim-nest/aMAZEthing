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
      "Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.",
    secondP: "As we go through each element, if the current element is bigger than the next one, we swap them"
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

  async function bubbleSort() {
    setClicked(true)
    const copyArr = array.slice();
    const {ArrayStates, animations} = bubbleSortAlgo(copyArr);
    for(let i = 0; i<animations.length; i++) {
      await delay(1000)
      const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
      document.getElementById(`${elementOne}`)!.style.backgroundColor = 'red'
      document.getElementById(`${elementTwo}`)!.style.backgroundColor = 'red'
      document.getElementById(`${elementOne}`)!.style.transform += `translateX(40px)`
      document.getElementById(`${elementTwo}`)!.style.transform += `translateX(-40px)`
      await delay(1000)
      document.getElementById(`${elementOne}`)!.style.backgroundColor = 'green'
      document.getElementById(`${elementTwo}`)!.style.backgroundColor = 'green'
    }
      
  }
  function delay(time:number) {
    return new Promise((res) => setTimeout(res, time));
  }


  return (
      <div className="whole-page-wrapper">
        <div className="lesson-wrapper">
          <h1>{paragraphs.sortName}</h1>
          <p>{paragraphs.firstP}</p>
        </div>

        <div className="lesson-wrapper-2">
          <p>{paragraphs.secondP}</p>
            {!clicked && <button className="button clickSort" onClick={bubbleSort}> click </button>}
        </div>

        <div className="array">
            {array.map((element, index) => (
              <div
              className={`array-el`}
              style={{
                backgroundColor: "green",
                height: `${element*20}px`,
                order : `${index}`
              }}
              id={`${element}`}
              key={index}
              >
                {" "}
                {element}{" "}
              </div>
            ))}
          </div>
      </div>
  );
}
