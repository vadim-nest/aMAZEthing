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

function Profile() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const user = useAppSelector((state) => state.user);
  const [img, setImg] = useState();

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

  return (
    <div className='profile-page'>
      <div className="user-dashboard">
        <div className="user-info">
          <div className='user-part'>
            <div>
              {img && <img className='icon' src={'data:image/jpeg;base64,' + img} />}
            </div>
            <div className='user-name'>
              <h1>HELLO {user.username ? (user as User).username : 'THERE'},</h1>
              <input
              id='text'
              type="text"
              placeholder="username"
              name="username"
              onChange={changeUsername}
              />
              <button onClick={updateChanges}>Save</button>
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
      <ProfileGameHistory/>
    </div>
  );
}

export default Profile;
