import '../css/waitingRoom.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function WaitingRoom() {

  const navigate = useNavigate();
  const [createClicked, setCreateClicked] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);

  function onCreateCLicked () {
    if (!createClicked) {
      // greyOutOtherButtons('Create');
      setCreateClicked(true);
      setJoinClicked(false);
      setPlayClicked(false);
    } else {
      setCreateClicked(false);
    }
  }

  function onJoinCLicked () {
    if (!joinClicked) {
      setJoinClicked(true);
      setCreateClicked(false);
      setPlayClicked(false);
    } else {
      setJoinClicked(false);
    }
  }

  function onPlayClicked () {
    if (!playClicked) {
      setPlayClicked(true);
      setJoinClicked(false);
      setCreateClicked(false);
      // navigate('/game');
      setTimeout(() => navigate('/game'), 3000)
    } else {
      setPlayClicked(false);
    }
  }


  return (
    <div className='waiting-room'>

      <h3 className='explanation-text'><span className='wait-r-yellow'>Create</span> a private party or <span className='wait-r-red'>search</span> for a game</h3>
      <div className='selection-panel'>
        <div className='left-side-selection'>
          <button className='wr-main-button'><h1 className={`waiting-page-create-button ${createClicked && 'wait-r-yellow'} ${playClicked && 'playClicked'} ${joinClicked && 'joinClicked'}`} onClick={() => onCreateCLicked()}>Create</h1></button>
          {createClicked
            ? (<input className='create-room-code' type="text" id="fname" name="fname" placeholder='fgd83'/>)
            : <button className='wr-main-button'><h1 className={`waiting-page-join-button ${joinClicked && 'wait-r-yellow'} ${playClicked && 'playClicked'} ${createClicked && 'createClicked'}`} onClick={() => onJoinCLicked()}>Join</h1></button>}
        {joinClicked
        ? (<>
            <div className='join-code-input'>
              <input className='create-room-code join-room-code' type="text" id="fname" name="fname" placeholder='type the code here'/>
              <button className='submit-the-code-button'>✓</button>
            </div>
          </>
        )
        : <></>}
        </div>
        <div className='right-side-selection'>
          <button className='wr-main-button' onClick={() => onPlayClicked()}><h1 className={`wr-play-button ${playClicked && 'wait-r-red'} ${joinClicked && 'joinClicked'} ${createClicked && 'createClicked'}`}>Play</h1></button>
          { playClicked
            ? ( <>
                  <h3 className='play-h3 wr-amazing-text'>Looking for <span className='wait-r-red'>play</span>ers</h3>
                  <div className='loading-animation'/>
                </>
            )
            : (<div className='wr-amazing-text'>
                <p>The most amazing</p>
                <p>learning game.</p>
              </div>
              )}
        </div>
      </div>
    </div>
  )
}

export default WaitingRoom;