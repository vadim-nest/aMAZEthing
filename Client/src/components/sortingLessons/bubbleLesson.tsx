import '../../css/sorting.css';
import { useEffect, useState } from 'react';
import { bubbleSortAlgo, generateArray } from '../../utils/sorting-algo';
import Visualization from './visualization';
import { bubbleSortVisual } from '../../utils/sorting-helper-visual';
import { useAppSelector } from '../../features/hooks';

export default function BubbleLesson() {
  const user = useAppSelector((state) => state.user);
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);

  console.log(user);

  let WIDTH = 35;
  let MIN_VAL = 7;
  let MAX_VAL = 50;
  let NUM_BARS = 20;
  let DELAY = 100;
  let PADTOP = 10;
  let MARGIN = 3;
  let HEIGHT = 5;

  let paragraphs = {
    sortName: 'Bubble sort',
    firstP:
      'Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. Starting on one side, compares adjacent items and keep “bubbling” the larger one to the other side. Worst time complexity O(N^2).',
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    const copyArr = array.slice();
    setAnimations(bubbleSortAlgo(copyArr, false));
  }, [array]);

  function initArr() {
    setClicked(false);
    setIsSorted(false);
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }

  return (
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>

      <div className="lesson-wrapper-2">
        <div>
          {!clicked && (
            <button className="button clickSort" onClick={() => initArr()}>
              new array
            </button>
          )}

          {!clicked && !isSorted && (
            <button
              className="button clickSort"
              onClick={() => {
                setClicked(true);
              }}
            >
              visualize
            </button>
          )}

          {!isSorted && clicked && (
            <button className="button clickSort">wait... </button>
          )}
        </div>
        <Visualization
          width={WIDTH}
          delay={DELAY}
          margin={MARGIN}
          paddingTop={PADTOP}
          array={array}
          height={HEIGHT}
          fontColor={'white'}
          key={array}
          animations={animations}
          clicked={clicked}
          sortingAlgo={bubbleSortVisual}
          setClicked={setClicked}
          setIsSorted={setIsSorted}
        />
      </div>
    </div>
  );
}
