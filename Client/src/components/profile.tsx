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
import changeMe from '../assets/profile/changeMe.png';
import { current } from '@reduxjs/toolkit';

function Profile() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const user = useAppSelector((state) => state.user);
  const [img, setImg] = useState();
  const [inputOpen, setInputOpen] = useState(false);

  let currentSortProgress = 0
  let currentPathProgress = 0

  for(let bool of user.sortLessons) {
    if (bool === true) currentSortProgress++
    else break
  }

  for(let bool of user.pathLessons) {
    if (bool === true) currentPathProgress++
    else break
  }

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
            <div className='icon'>
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
                    maxLength= {15}
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
            <h1 className='learning-progress'>Learning progress:</h1>
            <div className='progress'>
              <div className='sort-progress'>
                <div><img className='sort-progress-img' src={sort}/></div><h3 className='algo-name'>Sorting Algorithms</h3><h3>{user.sortLessons}</h3>
                <h3 className='progress-number'>{currentSortProgress}/6</h3>
              </div>
              <div className='path-progress'>
                <div><img className='path-progress-img' src={path}/></div><h3 className='algo-name'>Path Finding Algorithms</h3><h3>{user.pathLessons}</h3>
                <h3 className='progress-number'>{currentPathProgress}/4</h3>
              </div>
            </div>
          </div>
        </div>
      <div className="user-stats">
          <h1 className='achievements'>ACHIEVEMENTS</h1>
          <div className='circles'>
            <div className='circle' onClick={() => alert('are you circle?')}></div>
            <div className='circle' onClick={() => alert('are you circle?')}></div>
            <div className='circle' onClick={() => alert('are you circle?')}></div>
            <div className='circle' onClick={() => alert('are you circle?')}></div>
          </div>
          <div className='stats-line'>
            <h4 className='stats-text'>
              MATCHES
              <h4  className='stats-text'>14</h4></h4>
            <h4 className='stats-text'>WINS
            <h4 className='wins-yellow'>3</h4></h4>

            <h4 className='stats-text'>LOSSES<h4 className='losses-red'>2</h4></h4>
            <h4 className='stats-text'>WIN RATE<h4  className='stats-text'>60%</h4></h4>
            <h4 className='stats-text'>GOLD EARNED<h4  className='stats-text'>200</h4></h4>
          </div>
          <h3 className='created'>Account created {new Date().toLocaleDateString()}</h3> {/* get the date when the account was created */}
        </div>
      </div>
      <ProfileGameHistory/>
    </div>
  );
}

export default Profile;
