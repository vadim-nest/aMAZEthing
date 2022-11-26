import '../css/mazeTile.css';

function MazeTile({value, classes, boxSize, generated}: {value: string, classes: string[], boxSize: number, generated: boolean}) {
  return (
    <>
      <div className={`mazeTile ${classes.join(' ')} ${value} ${generated && 'showNone'}`} style={{height: `${boxSize}px`, width: `${boxSize}px`}}/>
    </>
  );
}

export default MazeTile;