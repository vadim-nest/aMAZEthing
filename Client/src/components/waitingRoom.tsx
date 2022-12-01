import '../css/waitingRoom.css';
import { useNavigate } from 'react-router-dom';
import { createRef, useRef, useState } from 'react';
// import { useEffect } from 'react';
// import { useAuth0 } from "@auth0/auth0-react";
// import MediaQuery from 'react-responsive';
// import apiService from '../services/apiService';

function WaitingRoom() {

  const navigate = useNavigate();
  const [createClicked, setCreateClicked] = useState(false);
  const [joinClicked, setJoinClicked] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);

  const joinRef = useRef(null);

  function onCreateCLicked () {
    if (!createClicked) {
      // greyOutOtherButtons('Create');
      setCreateClicked(true);
      setJoinClicked(false);
      setPlayClicked(false);
      // (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).style.color = 'var(--yellow)';
      // (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).onmouseleave = () => (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).style.color = 'var(--yellow)';

    } else {
      setCreateClicked(false);
      // (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).style.color = 'var(--white-green)';
      // (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).onmouseenter = () => (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).style.color = 'var(--yellow)';
      // (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).onmouseleave = () => (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).style.color = 'var(--white-green)';
    }
  }

  function onJoinCLicked () {
    if (!joinClicked) {
      // greyOutOtherButtons('Join');
      setJoinClicked(true);
      setCreateClicked(false);
      setPlayClicked(false);
      // (document.querySelector('.waiting-page-join-button') as unknown as HTMLElement).style.color = 'var(--yellow)';
      // (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).onmouseleave = () => (document.querySelector('.waiting-page-join-button') as unknown as HTMLElement).style.color = 'var(--yellow)';
    } else {
      setJoinClicked(false);
      // (document.querySelector('.waiting-page-join-button') as unknown as HTMLElement).style.color = 'var(--white-green)';
      // (document.querySelector('.waiting-page-join-button') as unknown as HTMLElement).onmouseenter = () => (document.querySelector('.waiting-page-join-button') as unknown as HTMLElement).style.color = 'var(--yellow)';
      // (document.querySelector('.waiting-page-join-button') as unknown as HTMLElement).onmouseleave = () => (document.querySelector('.waiting-page-join-button') as unknown as HTMLElement).style.color = 'var(--white-green)';
    }
  }

  function onPlayClicked () {
    if (!playClicked) {
      // greyOutOtherButtons('Join');
      setPlayClicked(true);
      setJoinClicked(false);
      setCreateClicked(false);
      console.log(joinRef);

      // (joinRef).current.focus();
    } else {
      setPlayClicked(false);
    }
  }

  // function greyOutOtherButtons(buttonCLicked: string) {
  //   console.log('click');
  //   (document.querySelector('.wr-amazing-text') as unknown as HTMLElement).style.transition= '0.1s ease-in';
  //   (document.querySelector('.wr-amazing-text') as unknown as HTMLElement).style.color = `var(--dark-green)`;

  //   document.querySelectorAll('.waiting-room button h1').forEach((buttonEl) => {
  //     console.log(buttonEl.innerHTML);
  //     if (buttonEl.innerHTML !== buttonCLicked) {
  //       (buttonEl as unknown as HTMLElement).style.transition= '0.1s ease-in';
  //       (buttonEl as unknown as HTMLElement).style.color = `var(--dark-green)`;
  //       (buttonEl as unknown as HTMLElement).onmouseenter = () => (document.querySelector('.waiting-page-join-button') as unknown as HTMLElement).style.color = 'var(--dark-green)';

  //       (buttonEl as unknown as HTMLElement).style.color = `var(--dark-green)`;
  //     }
  //   });
  // }

  // if (createClicked || joinClicked || playClicked || !createClicked || !joinClicked || !playClicked) {
  //   (document.querySelector('.waiting-page-create-button') as unknown as HTMLElement).style.color = 'var(--yellow)';
  // }



  return (
      // <button className='options' onClick={() => navigate('/game')}>PLAY</button>
    <div className='waiting-room'>

      <h3 className='explanation-text'><span className='wait-r-yellow'>Create</span> a private party or <span className='wait-r-red'>search</span> for a game</h3>
      <div className='selection-panel'>
        <div className='left-side-selection'>
          <button className='wr-main-button'><h1 className={`waiting-page-create-button ${playClicked && 'playClicked'} ${joinClicked && 'joinClicked'}`} onClick={() => onCreateCLicked()}>Create</h1></button>
          {createClicked
            ? (<input className='create-room-code' type="text" id="fname" name="fname" placeholder='fgd83'/>)
            : <button ref={joinRef} className='wr-main-button'><h1 className={`waiting-page-join-button ${playClicked && 'playClicked'} ${createClicked && 'createClicked'}`} onClick={() => onJoinCLicked()}>Join</h1></button>}

        </div>
        <div className='right-side-selection'>
          <button className='wr-main-button' onClick={() => onPlayClicked()}><h1 className={`wr-play-button ${joinClicked && 'joinClicked'} ${createClicked && 'createClicked'}`}>Play</h1></button>
          { playClicked
            ? <p>Loading screen</p>
            : (<div className='wr-amazing-text'>
                <p>The most amazing</p>
                <p>learning game.</p>
              </div>
              )}
        </div>
      </div>
      {joinClicked
        ? (<>
            <div className='join-code-input'>
              <input className='create-room-code' type="text" id="fname" name="fname" placeholder='type the code here'/>
              <button className='submit-the-code-button'>✓</button>
            </div>
          </>
        )
        : <></>}
      {/* The  */}
    </div>
  )
}

export default WaitingRoom;