import { useEffect, useState } from 'react'
import '../../css/sorting.css';
import { selectionSortAlgo, generateArray } from "../../utils/sorting-algo";
import Visualization from './visualization';

export default function SelectionLesson() {
  const [array, setArray] = useState([] as number[]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[]] as number[][])

    let paragraphs = {
        sortName: "Selection sort",
        firstP:
          "This algorithm is slightly different than the previous two. Someone write the explanation.",
      };


      useEffect(() => {
        setArray(array => array = generateArray(5))
      }, [])
    
      useEffect(() => {
        console.log(array)
        const copyArr = array.slice()
        setAnimations(selectionSortAlgo(copyArr))
      }, [array])
    
      function initArr(ARR_BARS:number) {
        setClicked(false)
        setArray(array => array = generateArray(ARR_BARS));
      }

    async function selectionSort() {
        for(let i = 0; i<animations.length; i++) {
          await delay(300)
          if(animations[i].length > 2) {
            const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
          const distance = (indexOne - indexTwo)
          document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)'
          document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--red)'
          document.getElementById(`${indexOne}`)!.style.transform += `translateX(${distance*-60}px)`
          document.getElementById(`${indexTwo}`)!.style.transform += `translateX(${distance*60}px)`
          await delay(300)
          document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)'
          document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--main-green)'
          let tempNode =  document.getElementById(`${indexTwo}`) 
          document.getElementById(`${indexOne}`)!.id = `${indexTwo}`
          tempNode!.id =`${indexOne}`
          } else {
            const [indexOne, indexTwo] = animations[i]
            document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)'
            document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--red)'
            await delay(300)
            document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)'
            document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--main-green)'
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
          <button className='button clickSort' onClick={() => initArr(5)}> new array </button>
          {!clicked && 
            <button className="button clickSort" onClick={() => setClicked(true)}>
              visualize
            </button>
          }
        </div>
        <Visualization array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={selectionSort}/>

      </div>
    </div>
    )
}