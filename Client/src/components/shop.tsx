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
      <div onClick={() => addNewMinion('Hare')}>
        <Squirrel currentPlayer='p1-color' />
      </div>
    </div>
  );
}
