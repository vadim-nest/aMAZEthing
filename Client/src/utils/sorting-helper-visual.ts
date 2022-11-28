export async function bubbleSortVisual(animations:number[][]) {
    for (let i = 0; i < animations.length; i++) {
      await delay(200);
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


        await delay(200);
        document.getElementById(`${indexOne}`)!.style.backgroundColor =
          'var(--main-green)';
        document.getElementById(`${indexTwo}`)!.style.backgroundColor =
          'var(--main-green)';


        let tempNode = document.getElementById(`${indexTwo}`);
        console.log(tempNode)
        document.getElementById(`${indexOne}`)!.setAttribute('id', `${indexTwo}`)
        tempNode!.setAttribute('id', `${indexOne}`);

      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}`)!.style.backgroundColor =
          'var(--red)';
        await delay(200);
        document.getElementById(`${indexOne}`)!.style.backgroundColor =
          'var(--main-green)';
      }

    }
  }
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  export async function insertionSortVisual(animations:number[][]) {

    for (let i = 0; i < animations.length; i++) {
      await delay(300);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--red)';

        
        document.getElementById(
          `${indexOne}`
        )!.style.transform += `translateX(-60px)`;
        document.getElementById(
          `${indexTwo}`
        )!.style.transform += `translateX(60px)`;

        await delay(300);
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)';
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--main-green)';


        let tempNode = document.getElementById(`${indexTwo}`);
        document.getElementById(`${indexOne}`)!.id = `${indexTwo}`;
        tempNode!.id = `${indexOne}`;
      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)';
        await delay(300);
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)';
      }
    }
  }