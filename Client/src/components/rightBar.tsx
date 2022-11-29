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

function RightBar({
  addNewMinion,
  allTilesHidden,
  currentMinion,
  minions
}: {
  addNewMinion: (type: "Squirrel" | "Badger" | "Hare" | "Deer" | "Koala" | "Bear") => void;
  allTilesHidden: boolean;
  currentMinion: null | number,
  minions: {[key: number]: minionType},
}) {

  const [shopOpen, setShopOpen] = useState(false);

  return (
    <div className='right-bar'>

      {shopOpen ? (
        <Shop addNewMinion={addNewMinion} minions={minions}/>
      ) : <div className='your-minions'>
      {currentMinion !== null &&
        // Should be a name instead
        <div>
          <h1 className='left-just-stats'>{minions[currentMinion].type}</h1>
          <h1 className='current-minion-svg-left-bar'>{whichAnimalSVG(minions[currentMinion])}</h1>
        </div>
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
          <ShopSVG />
        </button>
      )}
    </div>
  );
}

export default RightBar;
