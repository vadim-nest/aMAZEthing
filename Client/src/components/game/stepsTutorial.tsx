
import '../../css/game/tutorial.css'
import { useState

} from 'react';
import { useTutorial } from '../../features/hooks';
function StepsTutorial({setSkipTutorial}:{
    setSkipTutorial:any;
}){
    const [steps,setSteps] = useState(1);
    const [maxStates] = useState(5)

    return(
    <div id="tutorial">
            {useTutorial(steps)}
            <div id="tutorialCounter">{steps}/{maxStates}</div>
            <button 
                className='btn-tutorial'
                id="nextButton"  
                onClick={() => {
                    if(steps===maxStates) setSkipTutorial(false);
                    setSteps(steps+1)
                 }}
                type="button">
                Next
            </button>
            <button 
                className='btn-tutorial'
                id="previousButton"
                onClick={() => {
                    if(steps>1) setSteps(steps-1)
                 }}  
                type="button">
                    Previous
            </button>
            <button 
                className='btn-tutorial'
                id="skipButton" 
                onClick={() => {
                    setSkipTutorial(false)
                 }}
                type="button">
                Skip Tutorial 
            </button>
    </div>
    )
}

export default StepsTutorial;
