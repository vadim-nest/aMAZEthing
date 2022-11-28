import { useEffect, useState } from "react"
import '../../css/sorting.css';


export default function Visualization(props: any) {

    const {array, animations, clicked, sortingAlgo, width } = props

    if(clicked) sortingAlgo(animations, 5, width)
   

    return(
        <div className="array">
            {array.map((element:number, index:number) => {
            console.log('rerender, element:', element)
            return (
            <div
              className={`array-el`}
              style={{
                backgroundColor: 'var(--main-green)',
                height: `${element * 20}px`,
                 width: `${width}px`
              }}
              id={`${index}`}
              key={index}
            >
            </div>
          )})}
            
        </div>
    )
}