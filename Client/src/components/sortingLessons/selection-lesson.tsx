import { useEffect, useState } from 'react'
import '../../css/sorting.css';
import { selectionSortAlgo, generateArray } from "../../utils/sorting-algo";
import { selectionSortVisual } from '../../utils/sorting-helper-visual';
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
        setArray(array => array = generateArray(100))
      }, [])
    
      useEffect(() => {
        console.log(array)
        const copyArr = array.slice()
        setAnimations(selectionSortAlgo(copyArr , true))
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
        <Visualization width={10} array={array} key={array} animations ={animations} clicked={clicked} sortingAlgo={selectionSortVisual}/>

      </div>
    </div>
    )
}