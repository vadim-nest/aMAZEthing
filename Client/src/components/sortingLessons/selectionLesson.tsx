import { useEffect, useState } from "react";
import "../../css/sorting.css";
import { selectionSortAlgo, generateArray } from "../../utils/sorting-algo";
import { selectionSortVisual } from "../../utils/sorting-helper-visual";
import Pagination from "../learning/pagination";
import StepsPath from "../pathfindingLessons/stepsPath";
import PseudoCode from "./psuedoCode";
import Visualization from "./visualization";

export default function SelectionLesson() {
  const [array, setArray] = useState([] as number[]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[]] as number[][]);
  const [isSorted, setIsSorted] = useState(false);
  let steps = [
    "Start",
    "Add neighbors into queue",
    "Shift queue and keep checking neighbors",
    "Repeat until it founds last state",
    "Find shortest path",
  ];

  let psuedoCode = [
    "bubbleSort(array)",
    "for i <- 1 to indexOfLastUnsortedElement-1",
    " if leftElement > rightElement",
    "swap leftElement and rightElement",
    "end bubbleSort"
  ]

  const WIDTH = 27;
  const MIN_VAL = 7;
  const MAX_VAL = 50;
  const NUM_BARS = 20;
  const DELAY = 100;
  const PADTOP = 3;
  const MARGIN = 1.5;
  const HEIGHT = 5;
  const FONTSIZE = 15


  let paragraphs = {
    sortName: "Selection sort",
    firstP:
      "This algorithm scans all the items and finds the smallest, swaps it into position as the first item. Then repeats the selection sort on the remaining items. Worst time complexity O(N^2) This algorithm scans",
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
    <Pagination  clicked={clicked} leftName={'Insertion'} rightName={'Merge'} leftLink={'learning/insertionLesson'} rightLink={'learning/mergeLesson'}>
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>

      <div className="lesson-wrapper-2">
        <div>
          <button
            className={
              clicked ? "button disabled clickSort" : "button clickSort"
            }
            disabled={clicked ? true : false}
            onClick={() => initArr()}
          >
            new array
          </button>

          <button
            className={
              clicked && !isSorted
                ? "button disabled clickSort"
                : isSorted
                ? "button disabled clickSort"
                : "button clickSort"
            }
            disabled={!isSorted && clicked ? true : isSorted ? true : false}
            onClick={() => {
              setClicked(true);
            }}
          >
            visualize
          </button>
        </div>
        <div className="visualRow">
        <PseudoCode steps={psuedoCode}></PseudoCode>
        <Visualization
          fontColor={"white"}
          fontSize={15}
          width={WIDTH}
          delay={DELAY}
          height={HEIGHT}
          margin={MARGIN}
          paddingTop={PADTOP}
          array={array}
          key={array as any}
          animations={animations}
          clicked={clicked}
          sortingAlgo={selectionSortVisual}
          setClicked={setClicked}
          setIsSorted={setIsSorted} tower={undefined} isSorted={false}        />
             <StepsPath steps={steps}></StepsPath>
        </div>
      </div>
    </div>
    </Pagination>
  );
}
