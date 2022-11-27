import { useEffect, useState } from 'react'
import { selectionSortAlgo } from "../../utils/sorting-algo";

export default function SelectionLesson() {

    const [array, setArray] = useState([5,1, 1,3, 4, 2, 8 ,2, 3 ]);
    const [clicked, setClicked] = useState(false)

    let paragraphs = {
        sortName: "Selection sort",
        firstP:
          "Selection Sort  This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.",
        secondP: "As we go through each element, if the current element is smaller than the previous one, the elements are swapped"
      };

    async function selectionSort() {
        setClicked(true)
        const copyArr = array.slice();
        const {ArrayStates, animations} = selectionSortAlgo(copyArr);
        for(let i = 0; i<animations.length; i++) {
          await delay(200)
          if(animations[i].length > 2) {
            const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
          const distance = (indexOne - indexTwo)
          document.getElementById(`${indexOne}`)!.style.backgroundColor = 'red'
          document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'red'
          document.getElementById(`${indexOne}`)!.style.transform += `translateX(${distance*-40}px)`
          document.getElementById(`${indexTwo}`)!.style.transform += `translateX(${distance*40}px)`
          await delay(200)
          document.getElementById(`${indexOne}`)!.style.backgroundColor = 'green'
          document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'green'
          let tempNode =  document.getElementById(`${indexTwo}`) 
          document.getElementById(`${indexOne}`)!.id = `${indexTwo}`
          tempNode!.id =`${indexOne}`
          } else {
            const [indexOne, indexTwo] = animations[i]
            document.getElementById(`${indexOne}`)!.style.backgroundColor = 'red'
            document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'red'
            await delay(200)
            document.getElementById(`${indexOne}`)!.style.backgroundColor = 'green'
            document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'green'
          }
          
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
            <div>
          {!clicked ? (
            <button className="button clickSort" onClick={selectionSort}>
              visualize 
            </button>
          ) : 
            <button className="button clickSort-clicked" onClick={() => window.location.reload()}>
                refresh the page {/*refresh to visualize again after the array is sorted*/}
            </button>
          }
        </div>
            <p>{paragraphs.secondP}</p>
          </div>
  
          <div className="array">
              {array.map((element, index) => (
                <div
                className={`array-el`}
                style={{
                  backgroundColor: "green",
                  height: `${element*20}px`,
                }}
                id={`${index}`}
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