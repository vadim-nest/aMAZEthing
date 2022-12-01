import Visualization from "./visualization";
import {
  bubbleSortVisual,
  insertionSortVisual,
  mergeSortVisual,
  selectionSortVisual,
  quickSortVisual,
} from "../../utils/sorting-helper-visual";
import {
  bubbleSortAlgo,
  insertionSortAlgo,
  mergeSortAlgo,
  selectionSortAlgo,
  quickSortAlgo,
} from "../../utils/sorting-algo";
import { useState, useEffect } from "react";

export default function AllSortsPlay() {
  return (
    <div className="playContainer">
      <div className="formContainer">
        <form>
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <label>
    Choose a browser from this list:
    <input list="browsers" name="myBrowser" />  
</label> 
          <datalist id="browsers">
            <option value="Chrome" />
            <option value="Firefox" />
            <option value="Internet Explorer" />
            <option value="Opera" />
            <option value="Safari" />
            <option value="Microsoft Edge" />
          </datalist>
          <button></button>
        </form>
      </div>
    </div>
  );
}
