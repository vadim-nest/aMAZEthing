
export async function bubbleSortVisual(animations:number[][], DELAY_MS:number, width:number) {
    for (let i = 0; i < animations.length; i++) {
      await delay(DELAY_MS);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}arrayColumn`)!.style.backgroundColor = 'var(--red)';


        document.getElementById(
          `${indexOne}arrayColumn`
        )!.style.transform += `translateX(${width+4}px)`;
        document.getElementById(
          `${indexTwo}arrayColumn`
        )!.style.transform += `translateX(-${width+4}px)`;


        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor =
          'var(--main-green)';
        document.getElementById(`${indexTwo}arrayColumn`)!.style.backgroundColor =
          'var(--main-green)';


        let tempNode = document.getElementById(`${indexTwo}arrayColumn`);
        console.log(tempNode)
        document.getElementById(`${indexOne}arrayColumn`)!.setAttribute('id', `${indexTwo}arrayColumn`)
        tempNode!.setAttribute('id', `${indexOne}arrayColumn`);

      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor =
          'var(--red)';
        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor =
          'var(--main-green)';
      }

    }
  }
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  export async function insertionSortVisual(animations:number[][], DELAY_MS:number, width:number) {

    for (let i = 0; i < animations.length; i++) {
      await delay(DELAY_MS);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}arrayColumn`)!.style.backgroundColor = 'var(--red)';

        
        document.getElementById(
          `${indexOne}arrayColumn`
        )!.style.transform += `translateX(-${width+4}px)`;
        document.getElementById(
          `${indexTwo}arrayColumn`
        )!.style.transform += `translateX(${width+4}px)`;

        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--main-green)';
        document.getElementById(`${indexTwo}arrayColumn`)!.style.backgroundColor = 'var(--main-green)';


        let tempNode = document.getElementById(`${indexTwo}arrayColumn`);
        document.getElementById(`${indexOne}arrayColumn`)!.id = `${indexTwo}arrayColumn`;
        tempNode!.id = `${indexOne}arrayColumn`;
      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--red)';
        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--main-green)';
      }
    }
  }

export async function selectionSortVisual(animations:number[][], ASC_MODE:number, width:number) {
    for(let i = 0; i<animations.length; i++) {
      await delay(ASC_MODE)
      if(animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
      const distance = (indexOne - indexTwo)
      document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--red)'
      document.getElementById(`${indexTwo}arrayColumn`)!.style.backgroundColor = 'var(--red)'
      document.getElementById(`${indexOne}arrayColumn`)!.style.transform += `translateX(${distance*-(width+4)}px)`
      document.getElementById(`${indexTwo}arrayColumn`)!.style.transform += `translateX(${distance*(width+4)}px)`
      await delay(ASC_MODE)
      document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--main-green)'
      document.getElementById(`${indexTwo}arrayColumn`)!.style.backgroundColor = 'var(--main-green)'
      let tempNode =  document.getElementById(`${indexTwo}arrayColumn`) 
      document.getElementById(`${indexOne}arrayColumn`)!.id = `${indexTwo}arrayColumn`
      tempNode!.id =`${indexOne}arrayColumn`
      } else {
        const [indexOne, indexTwo] = animations[i]
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--red)'
        document.getElementById(`${indexTwo}arrayColumn`)!.style.backgroundColor = 'var(--red)'
        await delay(ASC_MODE)
        document.getElementById(`${indexOne}arrayColumn`)!.style.backgroundColor = 'var(--main-green)'
        document.getElementById(`${indexTwo}arrayColumn`)!.style.backgroundColor = 'var(--main-green)'
      }
      
    }          
  }