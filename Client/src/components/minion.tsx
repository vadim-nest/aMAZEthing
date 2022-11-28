import '../css/minion.css';
import { minionType } from '../utils/types';
import AnimalSVG from './animal-svg';

function Minion({boxSize, minion, setCurrentMinion, setCurrentTile}: {
  boxSize: number,
  minion: minionType,
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
}) {

  function handleClick() {
    setCurrentTile(null);
    setCurrentMinion(minion.id);
  }

  function handleContextMenu() {
    setCurrentTile({
      xPos: minion.xPos,
      yPos: minion.yPos
    })
  }

  return (
      <div onClick={handleClick} onContextMenu={handleContextMenu}  className="minion" style={{fill: `red`, height: `${boxSize}px`, width: `${boxSize}px`, top: `${boxSize*minion.yPos}px`, left: `${boxSize*minion.xPos}px`}}>
        <AnimalSVG />
      </div>
  )
}

export default Minion;
