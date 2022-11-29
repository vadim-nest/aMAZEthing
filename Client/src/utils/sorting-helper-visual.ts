
export async function bubbleSortVisual(animations:number[][], DELAY_MS:number, width:number, margin:number,  tower:'' = '') {
    console.log(margin)
    for (let i = 0; i < animations.length; i++) {
      await delay(DELAY_MS);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';


        document.getElementById(
          `${indexOne}arrayColumn${tower}`
        )!.style.transform += `translateX(${width+margin*2}px)`;
        document.getElementById(
          `${indexTwo}arrayColumn${tower}`
        )!.style.transform += `translateX(-${width+margin*2}px)`;


        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor =
          'var(--main-green)';
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor =
          'var(--main-green)';


        let tempNode = document.getElementById(`${indexTwo}arrayColumn${tower}`);
        // console.log(tempNode)
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.setAttribute('id', `${indexTwo}arrayColumn${tower}`)
        tempNode!.setAttribute('id', `${indexOne}arrayColumn${tower}`);

      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor =
          'var(--red)';
        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor =
          'var(--main-green)';
      }

    }
  }
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  export async function insertionSortVisual(animations:number[][], DELAY_MS:number, width:number, tower: string = '') {

    for (let i = 0; i < animations.length; i++) {
      await delay(DELAY_MS);
      if (animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i];
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';

        
        document.getElementById(
          `${indexOne}arrayColumn${tower}`
        )!.style.transform += `translateX(-${width+4}px)`;
        document.getElementById(
          `${indexTwo}arrayColumn${tower}`
        )!.style.transform += `translateX(${width+4}px)`;

        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--main-green)';
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--main-green)';


        let tempNode = document.getElementById(`${indexTwo}arrayColumn${tower}`);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.id = `${indexTwo}arrayColumn${tower}`;
        tempNode!.id = `${indexOne}arrayColumn${tower}`;
      } else {
        const [indexOne, elementOne] = animations[i];
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)';
        await delay(DELAY_MS);
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--main-green)';
      }
    }
  }

export async function selectionSortVisual(animations:number[][], ASC_MODE:number, width:number, tower: string = '') {
    for(let i = 0; i<animations.length; i++) {
      await delay(ASC_MODE)
      if(animations[i].length > 2) {
        const [indexOne, elementOne, indexTwo, elementTwo] = animations[i]
      const distance = (indexOne - indexTwo)
      document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)'
      document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)'
      document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.transform += `translateX(${distance*-(width+4)}px)`
      document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.transform += `translateX(${distance*(width+4)}px)`
      await delay(ASC_MODE)
      document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--main-green)'
      document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--main-green)'
      let tempNode =  document.getElementById(`${indexTwo}arrayColumn${tower}`) 
      document.getElementById(`${indexOne}arrayColumn${tower}`)!.id = `${indexTwo}arrayColumn${tower}`
      tempNode!.id =`${indexOne}arrayColumn${tower}`
      } else {
        const [indexOne, indexTwo] = animations[i]
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)'
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--red)'
        await delay(ASC_MODE)
        document.getElementById(`${indexOne}arrayColumn${tower}`)!.style.backgroundColor = 'var(--main-green)'
        document.getElementById(`${indexTwo}arrayColumn${tower}`)!.style.backgroundColor = 'var(--main-green)'
      }
      
    }          
  }