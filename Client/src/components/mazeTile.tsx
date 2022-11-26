import '../css/mazeTile.css';

function MazeTile({value, classes, boxSize, generated, setCurrentTileHelper, setCurrentTile, setCurrentMinion}: {
  value: string, 
  classes: string[], 
  boxSize: number, 
  generated: boolean,
  setCurrentTileHelper: (value:number) => void,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
}) {
  return (
    <>
      <div onContextMenu={() => setCurrentTileHelper(Number(value))} onClick={() => {
        setCurrentMinion(null);
        setCurrentTile(null);
      }} className={`mazeTile ${classes.join(' ')} ${value} ${generated && 'showNone'}`} style={{height: `${boxSize}px`, width: `${boxSize}px`}}/>
    </>
  );
}

export default MazeTile;