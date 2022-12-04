import '../../css/mazeTile.css';
import { updateCurrentMinion, updateCurrentTower } from '../../features/game_slice';
import { useAppDispatch } from '../../features/hooks';
import { TowerType } from '../../utils/types';
import Path from './path';

function MazeTile({value, classes, path, boxSize, generated, setCurrentTileHelper, setCurrentTile}: {
  value: string, 
  classes: string[], 
  boxSize: number, 
  generated: boolean,
  path: '' | 'THOUGHTPROCESS' | 'PATH'
  setCurrentTileHelper: (value:number) => void,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
}) {

  const dispatch = useAppDispatch();

  return (
    <>
      <div onContextMenu={() => setCurrentTileHelper(Number(value))} onClick={() => {
        dispatch(updateCurrentMinion(null));
        setCurrentTile(null);
        dispatch(updateCurrentTower(null));
      }} className={`mazeTile ${classes.join(' ')} ${value} ${generated && 'showNone'}`} style={{height: `${boxSize}px`, width: `${boxSize}px`}}>
        {path && <Path thoughtProcess={path}/>}
      </div>
    </>
  );
}

export default MazeTile;