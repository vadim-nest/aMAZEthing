import { useEffect, useState } from "react"
import '../../css/sorting.css';


export default function Visualization(props: any) {

    let {array, animations, clicked, sortingAlgo, width, delay, height } = props

    if (!delay) delay = 5;
    if (!height) height = 20;

    if(clicked) sortingAlgo(animations, delay, width)
   

    return(
        <div className="array">
            {array.map((element:number, index:number) => {
            console.log('rerender, element:', element)
            return (
            <div
              className={`array-el`}
              style={{
                backgroundColor: 'var(--main-green)',
                height: `${element * height}px`,
                 width: `${width}px`
              }}
              id={`${index}arrayColumn`}
              key={index}
            >
            </div>
          )})}
            
        </div>
    )
}