import '../../css/sorting.css';
import { increaseTowersSorting } from '../../features/game_slice';
import { useAppDispatch } from '../../features/hooks';

export default function Visualization(props: any) {

    let {
      array, 
      animations, 
      clicked, 
      sortingAlgo, 
      margin = 5, 
      fontColor = 'var(--white-green)', 
      fontSize = 15, 
      paddingTop,
      width, 
      delay = 100, 
      height = 20, 
      tower = '', 
      setClicked = () => {},
      setIsSorted
    } = props;
    
    const dispatch = useAppDispatch();  

    if(clicked) {
      if (tower) dispatch(increaseTowersSorting(tower));
        sortingAlgo(animations, delay, width, margin, tower, height, () => {
          setClicked(false) 
          setIsSorted(true)})
    }

    return(
        <div className="array">
            {array.map((element:number, index:number) => {
            return (
            <div
              className={`array-el${tower}`}
              style={{
                backgroundColor: 'grey',
                height: `${element*height}px`,
                width: `${width}px`,
                margin: `${margin}px`,
                paddingTop: `${paddingTop}px`,
                transition: `transform ${delay/1000}s ease-in-out `,
                color: `${fontColor}`,
                fontSize:`${fontSize}px`
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