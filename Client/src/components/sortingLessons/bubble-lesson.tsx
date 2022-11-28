import '../../css/sorting.css';
import { useEffect, useState } from 'react';
import { bubbleSortAlgo, generateArray } from '../../utils/sorting-algo';

export default function BubbleLesson() {
  const [array, setArray] = useState([0]);
  const [clicked, setClicked] = useState(false);
  const [newArray, setNewArray] = useState(0)
  let paragraphs = {
    sortName: 'Bubble sort',
    firstP:
      'Bubble Sort is the simplest sorting algorithm that swaps two elements if they are in the wrong order. As we go through each element, if the current element is bigger than the next one, we swap them. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.',
  };

  useEffect(() => {
    if(newArray === 0){
      const arr = generateArray();
      setArray(arr);
    }
    if(newArray > 1) {
      const arr = generateArray();
      setArray(arr);
    }
  }, [newArray]);

  async function bubbleSort() {
    setClicked(true);
    setNewArray(count => count += 1)
    const copyArr = array.slice();
    const { animations } = bubbleSortAlgo(copyArr);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      await delay(300);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(
          `${indexOne}`
        )!.style.transform += `translateX(60px)`;
        document.getElementById(
          `${indexTwo}`
        )!.style.transform += `translateX(-60px)`;
        await delay(300);
        document.getElementById(`${indexOne}`)!.style.backgroundColor =
          'var(--main-green)';
        document.getElementById(`${indexTwo}`)!.style.backgroundColor =
          'var(--main-green)';
        let tempNode = document.getElementById(`${indexTwo}`);
        document.getElementById(`${indexOne}`)!.id = `${indexTwo}`;
        tempNode!.id = `${indexOne}`;
      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}`)!.style.backgroundColor =
          'var(--red)';
        await delay(300);
        document.getElementById(`${indexOne}`)!.style.backgroundColor =
          'var(--main-green)';
      }

    }
    setClicked(false)
  }
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="whole-page-wrapper">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>

      <div className="lesson-wrapper-2">
        <div>
          {!clicked ? (
            <button className="button clickSort" onClick={bubbleSort}>
              visualize
            </button>
          ) : (
            <button
              className="button clickSort-clicked"
            >
              wait...
            </button>
          )}
        </div>
        <div className="array">
          {array.map((element, index) => (
            <div
              className={`array-el`}
              style={{
                backgroundColor: 'var(--main-green)',
                height: `${element * 20}px`,
              }}
              id={`${index}`}
              key={index}
            >
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
