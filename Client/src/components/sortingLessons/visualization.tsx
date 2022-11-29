import { useEffect, useState } from "react"
import '../../css/sorting.css';


export default function Visualization(props: any) {

    let {array, animations, clicked, sortingAlgo, margin, paddingTop, width, delay, height, tower } = props

    if (!delay) delay = 100;
    if(!margin) margin = 5
    if (!height) height = 20;
    if (!tower) tower = '';

    if(clicked) {
      console.log('sorting', array, animations);
      sortingAlgo(animations, delay, width, margin, tower)
    }

    return(
        <div className="array">
            {array.map((element:number, index:number) => {
            return (
            <div
              className={`array-el`}
              style={{
                backgroundColor: 'var(--main-green)',
                height: `${element * height}px`,
                width: `${width}px`,
                margin: `${margin}px`,
                paddingTop: `${paddingTop}px`,
                transition: `transform ${delay/1000}s ease-in-out `
              }}
              id={`${index}arrayColumn${tower}`}
              key={`${index}`}
            >
              {element}
            </div>
          )})}
            
        </div>
    )
}