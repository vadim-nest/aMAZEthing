import '../css/rightBar.css';

function RightBar({addNewMinion, allTilesHidden}: {addNewMinion: () => void, allTilesHidden: boolean}) {
  return (
    <div className='right-bar'>
      {!allTilesHidden && <button onClick={addNewMinion}>New Minion</button>}
    </div>
  );
}

export default RightBar;