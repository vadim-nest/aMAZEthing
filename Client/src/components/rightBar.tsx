import '../css/rightBar.css';
import { useAppSelector } from '../features/hooks';
import MediaQuery from 'react-responsive';

function RightBar({addNewMinion, allTilesHidden}: {addNewMinion: () => void, allTilesHidden: boolean}) {
  const user  = useAppSelector((state)=>state.user);
  return (
    <div className='right-bar'>
      <MediaQuery minWidth={951}>
      <div className='money-time'>
        <h3>Money: </h3><h3 className='money-count'>200</h3>
        <h3>Time remaining: </h3><h3 className='time-count'>1:29</h3>
      </div>
      <div className='scores'>
        <h3>{user.username?user.username+': ':'You: '}</h3><h3 className='score-you'>3</h3><h3>Opponent: </h3><h3 className='score-opponent'>4</h3>
      </div>
      </MediaQuery>
      <MediaQuery maxWidth={654}>
      <div className='money-time-small'>
        <div className='money-small'>
          <h3>Money: </h3><h3 className='money-count'>200</h3>
        </div>
        <div className='time-small'>
          <h3>Time remaining: </h3><h3 className='time-count'>1:29</h3>
        </div>
      </div>
      <div className='scores-small'>
        <div className='you-small'>
          <h3>{user.username?user.username+': ':'You: '}</h3><h3 className='score-you'>3</h3>
        </div>
        <div className='opponent-small'>
          <h3>Opponent: </h3><h3 className='score-opponent'>4</h3>
        </div>
      </div>
      </MediaQuery>
      <MediaQuery maxWidth={950} minWidth={655}>
      <div className='money-time-medium'>
        <div className='money-medium'>
          <h3>Money: </h3><h3 className='money-count'>200</h3>
        </div>
        <div className='time-medium'>
          <h3>Time remaining: </h3><h3 className='time-count'>1:29</h3>
        </div>
      </div>
      <div className='scores-medium'>
        <div className='you-medium'>
          <h3>{user.username?user.username+': ':'You: '}</h3><h3 className='score-you'>3</h3>
        </div>
        <div className='opponent-medium'>
          <h3>Opponent: </h3><h3 className='score-opponent'>4</h3>
        </div>
      </div>
      </MediaQuery>
      {!allTilesHidden && <button onClick={addNewMinion}>New Minion</button>}
    </div>
  );
}

export default RightBar;