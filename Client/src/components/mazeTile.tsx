import '../css/mazeTile.css';

function MazeTile({value, classes, boxSize}: {value: string, classes: string[], boxSize: number}) {
  console.log(classes.join(' '));
  return (
    <>
      <div className={`mazeTile ${classes.join(' ')}`} style={{height: `${boxSize}px`, width: `${boxSize}px`}}/>
    </>
  );
}

export default MazeTile;