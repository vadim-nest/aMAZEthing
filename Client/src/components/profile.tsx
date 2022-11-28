import '../css/profile.css';
import { User } from '@auth0/auth0-react';
import { useAppSelector } from '../features/hooks';
import apiService from '../services/apiService';
import { Buffer } from 'buffer';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshDataNoAvatar } from '../features/user_slice';
import ProfileGameHistory from './profileGameHistory';
import sort from '../assets/profile/sort.png'
import path from '../assets/profile/path.png';
import coin from '../assets/profile/coin.png';
import changeMe from '../assets/profile/changeMe.png';

function Profile() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const user = useAppSelector((state) => state.user);
  const [img, setImg] = useState();
  const [inputOpen, setInputOpen] = useState(false);

  useEffect(() => {
    const base64String: any = Buffer.from(user.avatar.data.data).toString(
      'base64'
    );
    setImg(base64String);
  }, [user]);

  function changeUsername(e: any) {
    //TODO if type is Event value is not recognized
    const { value } = e.target;
    setUsername(value);
  }

  async function updateChanges(e: any) {
    e.preventDefault();
    console.log('hi', username);
    if (!isAuthenticated) return;
    try {
      const accessToken = await getAccessTokenSilently();
      const obj = await apiService.updateUsername(accessToken, {
        email: user.email,
        username: username,
      });
      if (obj.user) dispatch(refreshDataNoAvatar(obj.user));
    } catch (err) {
      console.log(err);
    }
  }

  const toggleInput = () => {
    setInputOpen(!inputOpen);
  };


  return (
    <div className='profile-page'>
      <div className="user-dashboard">
        <div className="user-info">
          <div className='user-part'>
            <div>
              {img && <img className='icon' src={'data:image/jpeg;base64,' + img} />}
            </div>
            <div className='user-name'>
              {inputOpen === false && <h1>HELLO {user.username ? (user as User).username : 'THERE'},<img className='changeMe' src={changeMe} onClick={toggleInput} /></h1>}
                <form className={`open-${inputOpen}`}>
                  <input
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={changeUsername}
                    className='input-body'
                    />
                  <button className='input-button' onClick={(e) => {
                    updateChanges(e);
                    setInputOpen(false)
                    }}>Save</button>
                </form>
              <h2>Email: {user.email}</h2>
            </div>
          </div>
          <div className='learning-progress'> 
            <h1>Learning progress:</h1>
            <div className='progress'>
              <div className='sort-progress'>
                <div><img className='sort-progress-img' src={sort}/></div><h2>Sorting Algorithms</h2><h2>{user.sortingPath}</h2>
              </div>
              <div className='path-progress'>
                <div><img className='path-progress-img' src={path}/></div><h2>Path Finding Algorithms</h2><h2>{user.pathFindPath}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="user-stats"><h1>STATS</h1></div>
      </div>
      <div className="user-games">
        <div className="game-victory">
          <h2>Wins: {user.overallWins.wins}</h2>
        </div>
        <div className="game-defeat">
          <h2>Losses: {user.overallWins.losses}</h2>
        </div>
      </div>
      <div>
        {user.games ? (
          <div>
            <h2>Game history</h2>
            <p>{user.games.map}</p>
          </div>
        ) : (
          <h2>No games played yet</h2>
        )}
      </div>
    </div>
  );
}

export default Profile;
