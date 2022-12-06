import '../../css/game/shop.css';
import { animal, badger, bear, deer, hare, koala, squirrel } from '../../utils/types';
import { useAppDispatch, useAppSelector, whichAnimalSVG } from '../../features/hooks';
import React from 'react';

let allAnimals = [ badger, bear, deer, hare, koala, squirrel ];

export default function Shop({
  addNewMinion,
  setShopOpen
}: {
  currentPlayer: 'p1' | 'p2',
  addNewMinion: (type: animal, player: 'p1' | 'p2') => void,
  setShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
}) {

  const dispatch = useAppDispatch();
  const { gameStats: {p1Coins, p2Coins}, currentPlayer, currentMinion } = useAppSelector(store => store.game);

  function shopItem(animal: animal) {
    return (
    <div className='buy-minion-button' onClick={() => {
      if (currentPlayer === 'p1' && p1Coins >= animal.cost) addNewMinion(animal, 'p1')
      else if (currentPlayer === 'p2' && p2Coins >= animal.cost) addNewMinion(animal, 'p2')

      setShopOpen(false)

    }}>
    <div className='shop-stats'>
      <h1 className='shop-just-stats'>{animal.type}</h1>

      <h1 className='shop-just-text'>Price</h1>
      <h1 className='shop-just-stats price'>{animal.cost}</h1>

      <h1 className='shop-just-text'>Sorting</h1>
      <h1 className='shop-just-stats'>{animal.sortingAlgo}</h1>

      <h1 className='shop-just-text'>Path finding</h1>
      <h1 className='shop-just-stats'>{animal.pathFindingAlgo}</h1>

      <h1 className='shop-just-text'>Speed</h1>
      <h1 className='shop-just-stats'>{animal.sortingSpeed}</h1>
    </div>
    <div className='in-shop-svg-large'>
      {whichAnimalSVG({type: animal.type, alignment: 'neutral'})};
    </div>
  </div>
  )
  }


  return (

    <div className='shop-page'>
      <h1 className='the-shop-sign'>Shop</h1>
      <ul className='shop-list'>
        {allAnimals.map((animal) => shopItem(animal))}
      </ul>
    </div>
  );
}
