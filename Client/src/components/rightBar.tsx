import '../css/rightBar.css';
import ShopSVG from './svg/ShopSVG';
import { minionType } from '../utils/types';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from './svg/animalsSVG';
import { useState } from 'react';
import Shop from './shop';

function storeButtonHover(isOnHover: boolean) {
  document.querySelectorAll('.store-button-yellow').forEach((svgEl) => {
    isOnHover
      ? ((svgEl as unknown as HTMLElement).style.fill = `var(--red)`)
      : ((svgEl as unknown as HTMLElement).style.fill = `var(--yellow)`);
  });
  document.querySelectorAll('.store-button-red').forEach((svgEl) => {
    isOnHover
      ? ((svgEl as unknown as HTMLElement).style.fill = `var(--yellow)`)
      : ((svgEl as unknown as HTMLElement).style.fill = `var(--red)`);
  });
}

function whichAnimalSVG (minion: minionType) {
  return (
    minion.type === 'Squirrel' ? <Squirrel currentPlayer={`${minion.alignment}-color`} /> :
    minion.type === 'Badger' ? <Badger currentPlayer={`${minion.alignment}-color`} /> :
    minion.type === 'Hare' ? <Hare currentPlayer={`${minion.alignment}-color`} /> :
    minion.type === 'Deer' ? <Deer currentPlayer={`${minion.alignment}-color`} /> :
    minion.type === 'Koala' ? <Koala currentPlayer={`${minion.alignment}-color`} /> :
    minion.type === 'Bear' && <Bear currentPlayer={`${minion.alignment}-color`} />
  )
}

function styleCurrentMinionBorder(currentMinId: number) {
  const allYourMinions = document.querySelectorAll('.your-minion-button');
  // const allYourMinionsHoverFix = document.querySelectorAll('.your-minion-button:hover');

  allYourMinions.forEach(minion => {
    // (minion as unknown as HTMLElement).style.borderColor = 'transparent';
    // (minion as unknown as HTMLElement).addEventListener('mouseover', () => (minion as unknown as HTMLElement).style.borderColor = 'var(--yellow)');
    // (minion as unknown as HTMLElement).addEventListener('mouseout', () => (minion as unknown as HTMLElement).style.borderColor = 'var(--yellow)');

    (minion as unknown as HTMLElement).style.backgroundColor = 'var(--green)';
  });


  (document.querySelector(`.right-bar-selector-${currentMinId}`) as unknown as HTMLElement).style.backgroundColor = 'var(--purple)';

  // (document.querySelector(`.right-bar-selector-${currentMinId}`) as unknown as HTMLElement).classList.add('permanent-border-selected');

  // permanent-border-selected
}

function RightBar({
  addNewMinion,
  allTilesHidden,
  currentMinion,
  setCurrentMinion,
  minions
}: {
  addNewMinion: (type: "Squirrel" | "Badger" | "Hare" | "Deer" | "Koala" | "Bear") => void;
  allTilesHidden: boolean;
  currentMinion: null | number,
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  minions: {[key: number]: minionType},
}) {

  const [shopOpen, setShopOpen] = useState(false);

  let allP1Minions: Array<minionType> = [];

  [minions].forEach((allMinions) => {
    for (const minion in allMinions) {
      if (allMinions[minion].alignment === 'p1') {
        allP1Minions.push(allMinions[minion]);
      }
    }
  });

  let minionsToRender = allP1Minions.map((p1minion) => {
    return (
      <>
        <div className={`your-minion-button right-bar-selector-${p1minion.id}`} onClick={() => {
            setCurrentMinion(p1minion.id);
            styleCurrentMinionBorder(p1minion.id);

          }}>
          <h1 className='right-bar-name'>Name ;)</h1>
          <h1 className='current-minion-svg-left-bar'>{whichAnimalSVG(minions[p1minion.id])}</h1>
        </div>
      </>
    )
  })



  return (
    <div className='right-bar'>

      {shopOpen ? (
        <Shop addNewMinion={addNewMinion} minions={minions}/>
      ) : <div className='your-minions'>
      {minions &&
        // Should be a name instead
        <>
          <ul className='your-minions-list'>
            {minionsToRender}
          </ul>
        </>
      }
      </div>}


      {!allTilesHidden && (
        <button
          className='store-button'
          style={shopOpen ? {backgroundColor: 'var(--purple)'} : {backgroundColor: 'transparent'}}
          // onClick={() => addNewMinion('Hare')}
          onClick={() => {shopOpen ? setShopOpen(false) : setShopOpen(true)}}
          onMouseEnter={() => storeButtonHover(true)}
          onMouseLeave={() => storeButtonHover(false)}
        >
          <div className='shopSVG'>
            <ShopSVG />
          </div>
        </button>
      )}
    </div>
  );
}

export default RightBar;
