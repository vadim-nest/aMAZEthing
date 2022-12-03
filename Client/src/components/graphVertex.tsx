
import { value } from "../utils/graph"
import '../css/graphVertex.css'


function GraphVertex({vertex}:{
    vertex:value
}){




    return(<div  className={`${vertex} vertex`}></div>)
}


export default GraphVertex