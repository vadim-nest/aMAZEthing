import { useEffect, useState } from 'react';
import '../../css/sorting.css';
import { selectionSortAlgo, generateArray } from '../../utils/sorting-algo';
import { selectionSortVisual } from '../../utils/sorting-helper-visual';
import Visualization from './visualization';

export default function SelectionLesson() {
  const [array, setArray] = useState([] as number[]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[]] as number[][]);
  const [isSorted, setIsSorted] = useState(false);

  let WIDTH = 35;
  let MIN_VAL = 3;
  let MAX_VAL = 50;
  let NUM_BARS = 20;
  let DELAY = 100;
  let PADTOP = 10;
  let MARGIN = 3;
  let HEIGHT = 5;

  let paragraphs = {
    sortName: 'Selection sort',
    firstP:
      'This algorithm scans all the items and finds the smallest, swaps it into position as the first item. Then repeats the selection sort on the remaining items. Worst time complexity O(N^2)',
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    console.log(array);
    const copyArr = array.slice();
    setAnimations(selectionSortAlgo(copyArr, false));
  }, [array]);

  function initArr() {
    setClicked(false);
    setIsSorted(false);
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }

  return (
    <div className="whole-page-wrapper">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
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
        </div>
        <Visualization
          fontColor={'white'}
          fontSize={15}
          width={WIDTH}
          delay={DELAY}
          height={HEIGHT}
          margin={MARGIN}
          paddingTop={PADTOP}
          array={array}
          key={array}
          animations={animations}
          clicked={clicked}
          sortingAlgo={selectionSortVisual}
          setClicked={setClicked}
          setIsSorted={setIsSorted}
        />
      </div>
    </div>
  );
}
