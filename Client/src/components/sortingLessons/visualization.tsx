import { useEffect, useState } from "react"
import '../../css/sorting.css';


export default function Visualization(props: any) {

    let {array, animations, clicked, sortingAlgo, width, delay, height, tower } = props

    if (!delay) delay = 5;
    if (!height) height = 20;
    if (!tower) tower = '';

    if(clicked) {
      console.log('sorting', array, animations);
      sortingAlgo(animations, delay, width, tower)
    }

    return(
        <div className="array">
            {array.map((element:number, index:number) => {
            // console.log('rerender, element:', element)
            return (
            <div
              className={`array-el`}
              style={{
                backgroundColor: 'var(--main-green)',
                height: `${element * height}px`,
                width: `${width}px`
              }}
              id={`${index}arrayColumn${tower}`}
              key={`${index}`}
            >
            </div>
          )})}
            
        </div>
    )
}