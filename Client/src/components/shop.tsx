import '../css/shop.css';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from './svg/animalsSVG';
import { animal, badger, bear, deer, hare, koala, minionType, squirrel } from '../utils/types';

export default function Shop({
  addNewMinion,
  minions
}: {
  addNewMinion: (type: animal) => void;
  minions: {[key: number]: minionType}
}) {
  return (
    <div className='shop-page'>
      <h1 className='the-shop-sign'>Shop</h1>
      <ul className='shop-list'>
        <div className='buy-minion-button' onClick={() => addNewMinion(squirrel)}>
          <div className='shop-stats'>
            <h1 className='shop-just-stats'>Squirrel</h1>
            <h1 className='shop-just-text'>Price</h1>
            <h1 className='shop-just-stats price'>3000</h1>

            <h1 className='shop-just-text'>Sorting algorithm</h1>
            <h1 className='shop-just-stats'>{squirrel.sortingAlgo}</h1>

            <h1 className='shop-just-text'>Path finding</h1>
            <h1 className='shop-just-text'>algorithm</h1>
            <h1 className='shop-just-stats'>{squirrel.pathFindingAlgo}</h1>

            <h1 className='shop-just-text'>Speed</h1>
            <h1 className='shop-just-stats'>{squirrel.sortingSpeed}</h1>
          </div>
          <Squirrel currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(badger)}>
          <div className='shop-stats'>
          <h1 className='shop-just-stats'>Badger</h1>
            <h1 className='shop-just-text'>Price</h1>
            <h1 className='shop-just-stats price'>3000</h1>

            <h1 className='shop-just-text'>Sorting algorithm</h1>
            <h1 className='shop-just-stats'>{badger.sortingAlgo}</h1>

            <h1 className='shop-just-text'>Path finding</h1>
            <h1 className='shop-just-text'>algorithm</h1>
            <h1 className='shop-just-stats'>{badger.pathFindingAlgo}</h1>

            <h1 className='shop-just-text'>Speed</h1>
            <h1 className='shop-just-stats'>{badger.sortingSpeed}</h1>
          </div>
          <Badger currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(hare)}>
          <div className='shop-stats'>
          <h1 className='shop-just-stats'>Hare</h1>
            <h1 className='shop-just-text'>Price</h1>
            <h1 className='shop-just-stats price'>3000</h1>

            <h1 className='shop-just-text'>Sorting algorithm</h1>
            <h1 className='shop-just-stats'>{hare.sortingAlgo}</h1>

            <h1 className='shop-just-text'>Path finding</h1>
            <h1 className='shop-just-text'>algorithm</h1>
            <h1 className='shop-just-stats'>{hare.pathFindingAlgo}</h1>

            <h1 className='shop-just-text'>Speed</h1>
            <h1 className='shop-just-stats'>{hare.sortingSpeed}</h1>
          </div>
          <Hare currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(deer)}>
          <div className='shop-stats'>
            <h1 className='shop-just-stats'>Deer</h1>
            <h1 className='shop-just-text'>Price</h1>
            <h1 className='shop-just-stats price'>3000</h1>

            <h1 className='shop-just-text'>Sorting algorithm</h1>
            <h1 className='shop-just-stats'>{deer.sortingAlgo}</h1>

            <h1 className='shop-just-text'>Path finding</h1>
            <h1 className='shop-just-text'>algorithm</h1>
            <h1 className='shop-just-stats'>{deer.pathFindingAlgo}</h1>

            <h1 className='shop-just-text'>Speed</h1>
            <h1 className='shop-just-stats'>{deer.sortingSpeed}</h1>
          </div>
          <Deer currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(koala)}>
          <div className='shop-stats'>
            <h1 className='shop-just-stats'>Koala</h1>
            <h1 className='shop-just-text'>Price</h1>
            <h1 className='shop-just-stats price'>3000</h1>

            <h1 className='shop-just-text'>Sorting algorithm</h1>
            <h1 className='shop-just-stats'>{koala.sortingAlgo}</h1>

            <h1 className='shop-just-text'>Path finding</h1>
            <h1 className='shop-just-text'>algorithm</h1>
            <h1 className='shop-just-stats'>{koala.pathFindingAlgo}</h1>

            <h1 className='shop-just-text'>Speed</h1>
            <h1 className='shop-just-stats'>{koala.sortingSpeed}</h1>
          </div>
          <Koala currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(bear)}>
          <div className='shop-stats'>
           <h1 className='shop-just-stats'>Bear</h1>
            <h1 className='shop-just-text'>Price</h1>
            <h1 className='shop-just-stats price'>3000</h1>

            <h1 className='shop-just-text'>Sorting algorithm</h1>
            <h1 className='shop-just-stats'>{bear.sortingAlgo}</h1>

            <h1 className='shop-just-text'>Path finding</h1>
            <h1 className='shop-just-text'>algorithm</h1>
            <h1 className='shop-just-stats'>{bear.pathFindingAlgo}</h1>

            <h1 className='shop-just-text'>Speed</h1>
            <h1 className='shop-just-stats'>{bear.sortingSpeed}</h1>
          </div>
          <Bear currentPlayer='p1-color' />
        </div>
      </ul>
    </div>
  );
}
