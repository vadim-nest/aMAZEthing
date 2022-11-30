import '../css/shop.css';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from './svg/animalsSVG';
import { minionType } from '../utils/types';

export default function Shop({
  addNewMinion,
  minions
}: {
  addNewMinion: (type: "Squirrel" | "Badger" | "Hare" | "Deer" | "Koala" | "Bear") => void;
  minions: {[key: number]: minionType}
}) {
  return (
    <div className='shop-page'>
      <h1>Shop</h1>
      <ul className='shop-list'>
        <div className='buy-minion-button' onClick={() => addNewMinion('Squirrel')}>
          <Squirrel currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion('Badger')}>
          <Badger currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion('Hare')}>
          <Hare currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion('Deer')}>
          <Deer currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion('Koala')}>
          <Koala currentPlayer='p1-color' />
        </div>
        <div className='buy-minion-button' onClick={() => addNewMinion('Bear')}>
          <Bear currentPlayer='p1-color' />
        </div>
      </ul>
    </div>
  );
}
