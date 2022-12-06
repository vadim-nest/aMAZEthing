import "../../css/sorting.css";
import { useState, useEffect } from "react";
import { insertionSortAlgo, generateArray } from "../../utils/sorting-algo";
import Visualization from "./visualization";
import { useAlgo } from "../../features/hooks";
import { insertionSortVisual } from "../../utils/sorting-helper-visual";
import Pagination from "../learning/pagination";
import StepsPath from "../pathfindingLessons/stepsPath";
import PseudoCode from "./psuedoCode";

export default function InsertionLesson() {
  const [array, setArray] = useState([3, 5, 7]);
  const [clicked, setClicked] = useState(false);
  const [animations, setAnimations] = useState([[1]]);
  const [isSorted, setIsSorted] = useState(false);
  let steps = [
    "Check neighbors",
    "Add neighbors into queue",
    "Shift queue and keep checking neighbors",
    "Repeat until it founds last state",
    "Find shortest path",
  ];

  let pseudo =[
    "insertionSort(array)",
    "mark first element as sorted",
    "for each unsorted element X",
    "'extract' the element X",
    "for j <- lastSortedIndex down to 0",
    "if current element j > X",
    "move sorted element to the right by 1",
    "break loop and insert X here",
    "end insertionSort"
  ]

  const WIDTH = 27;
  const MIN_VAL = 7;
  const MAX_VAL = 50;
  const NUM_BARS = 20;
  const DELAY = 100;
  const PADTOP = 3;
  const MARGIN = 1.5;
  const HEIGHT = 5;
  const FONTSIZE = 15;

  const paragraphs = {
    sortName: "Insertion sort",
    firstP:
      "Starts on one side and compares two first items, sorts them and moves on to the next item checking if it is smaller than the previous items and places it in its place. Worst time complexity O(N^2). ",
  };

  useEffect(() => {
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }, []);

  useEffect(() => {
    console.log(array);
    const copyArr = array.slice();
    setAnimations(useAlgo("insertion", copyArr, false));
  }, [array]);

  function initArr() {
    setClicked(false);
    setIsSorted(false);
    setArray((array) => (array = generateArray(NUM_BARS, MIN_VAL, MAX_VAL)));
  }

  return (
    <Pagination
      clicked={clicked}
      leftName={"Bubble"}
      rightName={"Selection"}
      leftLink={"learning/bubbleLesson"}
      rightLink={"learning/selectionLesson"}
    >
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
            <PseudoCode steps={pseudo}></PseudoCode>
            <Visualization
              fontColor={"white"}
              width={WIDTH}
              delay={DELAY}
              margin={MARGIN}
              height={HEIGHT}
              paddingTop={PADTOP}
              array={array}
              key={array as any}
              animations={animations}
              clicked={clicked}
              sortingAlgo={insertionSortVisual}
              setClicked={setClicked}
              setIsSorted={setIsSorted}
              fontSize={FONTSIZE}
              tower={undefined}
              isSorted={false}
            />
            <StepsPath steps={steps}></StepsPath>
          </div>
        </div>
      </div>
    </Pagination>
  );
}
