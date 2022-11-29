import '../css/rightBar.css';
import StoreSVG from './svg/storeSVG';

function RightBar({addNewMinion, allTilesHidden}: {addNewMinion: () => void, allTilesHidden: boolean}) {
  return (
    <div className='right-bar'>
      {!allTilesHidden && <button onClick={addNewMinion}>New Minion</button>}
      <StoreSVG />
    </div>
  );
}

export default RightBar;