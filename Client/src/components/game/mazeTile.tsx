import '../../css/mazeTile.css';
import { TowerType } from '../../utils/types';
import Path from './path';

function MazeTile({value, classes, path, boxSize, generated, setCurrentTileHelper, setCurrentTile, setCurrentMinion, setCurrentTower}: {
  value: string, 
  classes: string[], 
  boxSize: number, 
  generated: boolean,
  path: '' | 'THOUGHTPROCESS' | 'PATH'
  setCurrentTileHelper: (value:number) => void,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  setCurrentTower: React.Dispatch<React.SetStateAction<TowerType | null>>,
}) {
  return (
    <>
      <div onContextMenu={() => setCurrentTileHelper(Number(value))} onClick={() => {
        setCurrentMinion(null);
        setCurrentTile(null);
        setCurrentTower(null);
      }} className={`mazeTile ${classes.join(' ')} ${value} ${generated && 'showNone'}`} style={{height: `${boxSize}px`, width: `${boxSize}px`}}>
        {path && <Path thoughtProcess={path}/>}
      </div>
    </>
  );
}

export default MazeTile;