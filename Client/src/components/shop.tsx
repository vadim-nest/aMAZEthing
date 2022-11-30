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
      <h1>Shop</h1>
      <ul className='shop-list'>
        <div className='buy-minion-button' onClick={() => addNewMinion(squirrel)}>
          <h3>Price, sortingalg, path finding, speed, </h3>
          <Squirrel currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(badger)}>
          <Badger currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(hare)}>
          <Hare currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(deer)}>
          <Deer currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(koala)}>
          <Koala currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion(bear)}>
          <Bear currentPlayer='p1-color' />
        </div>
      </ul>
    </div>
  );
}
