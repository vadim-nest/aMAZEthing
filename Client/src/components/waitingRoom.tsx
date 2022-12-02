import '../css/waitingRoom.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import socket from '../services/socket';
import ProfileGameHistory from './profile/profileGameHistory';

function WaitingRoom() {
  const navigate = useNavigate();
  const [createClicked, setCreateClicked] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    socket.on('Game start', () => {
      console.log('Game started');
    });
  }, []);

  function hostRoom() {
    socket.emit('host', socket.id);
    console.log('socket.id', socket.id);
    setId(socket.id);
  }

  function joinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      fname: { value: string };
    };
    const room = target.fname.value;
    socket.emit('join', room);
  }

  function onCreateCLicked() {
    if (!createClicked) {
      // greyOutOtherButtons('Create');
      setCreateClicked(true);
      setJoinClicked(false);
      setPlayClicked(false);
    } else {
      setCreateClicked(false);
    }
  }

  function onJoinCLicked() {
    if (!joinClicked) {
      setJoinClicked(true);
      setCreateClicked(false);
      setPlayClicked(false);
    } else {
      setJoinClicked(false);
    }
  }

  function onPlayClicked() {
    if (!playClicked) {
      setPlayClicked(true);
      setJoinClicked(false);
      setCreateClicked(false);
      // navigate('/game');
      setTimeout(() => navigate('/game'), 3000);
    } else {
      setPlayClicked(false);
    }
  }

  return (
    <div className="waiting-room">
      <h3 className="wr-explanation-text">
        <span className="wait-r-yellow">Create</span>/<span className="wait-r-yellow">Join</span> a private party or{' '}
        <span className="wait-r-red">search</span> for a game
      </h3>
      <div className="selection-panel">
        <div className="left-side-selection">
          <form className='wr-form' onSubmit={joinRoom}>
            <button className="wr-main-button" type="button" onClick={hostRoom}>
              <h1
                className={`waiting-page-create-button ${
                  createClicked && 'wait-r-yellow'
                } ${playClicked && 'playClicked'} ${
                  joinClicked && 'joinClicked'
                }`}
                onClick={() => onCreateCLicked()}
              >
                Create
              </h1>
            </button>
            {createClicked ? (
              // <p>
              //   {id}
              // </p>
              <>
                <div className="wr-amazing-text wr-copy-text">
                  <p>Copy the code and send</p>
                  <p> to another player</p>
                </div>
                <input className='create-room-code'
                  placeholder={id} onClick={() => navigator.clipboard.writeText(`${id}`)}></input>
              </>
            ) : (
              <button className="wr-main-button">
                <h1
                  className={`waiting-page-join-button ${
                    joinClicked && 'wait-r-yellow'
                  } ${playClicked && 'playClicked'} ${
                    createClicked && 'createClicked'
                  }`}
                  onClick={() => onJoinCLicked()}
                >
                  Join
                </h1>
              </button>
            )}
            {joinClicked && (
              <>
                <div className="join-code-input">
                  <input
                    className="create-room-code join-room-code"
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="type the code here"
                    required
                  />
                  <button className="submit-the-code-button">✓</button>
                </div>
              </>
            )}
          </form>
        </div>
        <div className="right-side-selection">
          <button className="wr-main-button" onClick={() => onPlayClicked()}>
            <h1
              className={`wr-play-button ${playClicked && 'wait-r-red'} ${
                joinClicked && 'joinClicked'
              } ${createClicked && 'createClicked'}`}
            >
              Search
            </h1>
          </button>
          {playClicked ? (
            <>
              <h3 className="play-h3 wr-amazing-text">
                <span className="wait-r-red">Search</span>ing for a game
              </h3>
              <div className="loading-animation" />
            </>
          ) : (
            <div className="wr-amazing-text">
              <p>The most amazing</p>
              <p>learning game.</p>
            </div>
          )}
        </div>
      </div>
      <div className='wr-game-history'>
        <ProfileGameHistory />

      </div>
    </div>
  );
}

export default WaitingRoom;
