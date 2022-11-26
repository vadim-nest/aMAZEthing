import { useEffect, useState } from 'react'
import { selectionSortAlgo } from "../utils/sorting-algo";

export default function SelectionLesson() {

    const [array, setArray] = useState([5, 1, 4, 2, 8 ,3 ]);
    const [clicked, setClicked] = useState(false)

    let paragraphs = {
        sortName: "Selection sort",
        firstP:
          "Selection Sort is also a simple sorting algorithm that swaps two elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.",
        secondP: "As we go through each element, if the current element is smaller than the previous one, the elements are swapped"
      };

    async function selectionSort() {
        setClicked(true)
        const copyArr = array.slice();
        const {ArrayStates, animations} = selectionSortAlgo(copyArr);
        for(let i = 0; i<animations.length; i++) {
          await delay(1000)
          const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
          const distance = (indexOne - indexTwo)
          console.log(animations)
          console.log(distance)
          document.getElementById(`${elementOne}`)!.style.backgroundColor = 'red'
          document.getElementById(`${elementTwo}`)!.style.backgroundColor = 'red'
          document.getElementById(`${elementOne}`)!.style.transform += `translateX(${distance*-40}px)`
          document.getElementById(`${elementTwo}`)!.style.transform += `translateX(${distance*40}px)`
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
              {!clicked && <button className="button clickSort" onClick={selectionSort} > click </button>}
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