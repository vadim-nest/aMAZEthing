
import { value } from "../utils/graph"
import '../css/graphVertex.css'
import { useEffect } from "react";


function GraphVertex({vertex, edges, width}:{
    vertex:value;
    edges:any;
    width:number;
}){

    useEffect(()=>{
        console.log('EDGES',edges)
    },[])



    return(<div  id={`${vertex}`} className={`vertex`}>
            {edges.map((edge:[number, number, number])=>{
                if(edge[2]!==0){
                    if(edge[1]===edge[0]+1){
                        //right
                        if(document.getElementById(`${edge[0]},${edge[1]}-${edge[1]},${edge[0]}`) === null) return <div id={`${edge[0]},${edge[1]}-${edge[1]},${edge[0]}`} className={` edge-horizontal right-connection`}></div> 
                    }else if(edge[1]===edge[0]+width){
                        //bottom
                        if(document.getElementById(`${edge[0]},${edge[1]}-${edge[1]},${edge[0]}`) === null) return  <div id={`${edge[0]},${edge[1]}-${edge[1]},${edge[0]}`} className={` edge-vertical bottom-connection`}></div>
                    } 
                } 
            })}
            </div>)
}
export default GraphVertex