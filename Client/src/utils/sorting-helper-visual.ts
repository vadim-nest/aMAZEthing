export async function bubbleSortVisual(animations:number[][], DELAY_MS:number) {
    for (let i = 0; i < animations.length; i++) {
      await delay(DELAY_MS);
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


        await delay(DELAY_MS);
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
        await delay(DELAY_MS);
        document.getElementById(`${indexOne}`)!.style.backgroundColor =
          'var(--main-green)';
      }

    }
  }
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  export async function insertionSortVisual(animations:number[][], DELAY_MS:number) {

    for (let i = 0; i < animations.length; i++) {
      await delay(DELAY_MS);
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

        await delay(DELAY_MS);
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)';
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--main-green)';


        let tempNode = document.getElementById(`${indexTwo}`);
        document.getElementById(`${indexOne}`)!.id = `${indexTwo}`;
        tempNode!.id = `${indexOne}`;
      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)';
        await delay(DELAY_MS);
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)';
      }
    }
  }

export async function selectionSortVisual(animations:number[][], ASC_MODE:number) {
    for(let i = 0; i<animations.length; i++) {
      await delay(ASC_MODE)
      if(animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
      const distance = (indexOne - indexTwo)
      document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)'
      document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--red)'
      document.getElementById(`${indexOne}`)!.style.transform += `translateX(${distance*-60}px)`
      document.getElementById(`${indexTwo}`)!.style.transform += `translateX(${distance*60}px)`
      await delay(ASC_MODE)
      document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)'
      document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--main-green)'
      let tempNode =  document.getElementById(`${indexTwo}`) 
      document.getElementById(`${indexOne}`)!.id = `${indexTwo}`
      tempNode!.id =`${indexOne}`
      } else {
        const [indexOne, indexTwo] = animations[i]
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--red)'
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--red)'
        await delay(ASC_MODE)
        document.getElementById(`${indexOne}`)!.style.backgroundColor = 'var(--main-green)'
        document.getElementById(`${indexTwo}`)!.style.backgroundColor = 'var(--main-green)'
      }
      
    }          
  }