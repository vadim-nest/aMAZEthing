import '../css/leftBar.css';
import { minionType, TowerType } from '../utils/types';
import FlagSVG from './svg/flagSVG';
import MediaQuery from 'react-responsive';
import { useAppSelector } from '../features/hooks';
// import zoomInSVG from '../assets/game-different/search-3079.svg'
// import zoomOutSVG from '../assets/game-different/search-3080.svg'
import React from 'react';
// import ZoomInOutSVG from './zoomButtonsSVG';
import { ZoomInSVG, ZoomOutSVG } from './svg/zoomButtonsSVG';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from './svg/animalsSVG';

function LeftBar({setBoxSize, minBoxSize, maxBoxSize, currentMinion, currentTile, minions, currentTower, setCurrentTower, gameStats}: {
  setBoxSize: React.Dispatch<React.SetStateAction<number>>,
  minBoxSize: number,
  maxBoxSize: number,
  currentMinion: null | number,
  currentTile: null | {xPos:number, yPos:number},
  currentTower: null | TowerType,
  minions: {[key: number]: minionType},
  setCurrentTower: React.Dispatch<React.SetStateAction<null | TowerType>>
  gameStats: {timeRemaining: number, p1Coins: number, p2Coins: number, p1Towers: number[], p2Towers: number[], p1MinionCount: number, p2MinionCount: number}
}) {

  function zoomIn(amount: number) {
    setCurrentTower(null);
    setBoxSize(oldBoxSize => {
      if (oldBoxSize + amount > maxBoxSize) return maxBoxSize;
      return oldBoxSize + amount;
    })
  }

  function zoomOut(amount: number) {
    setCurrentTower(null);
    setBoxSize(oldBoxSize => {
      if (oldBoxSize - amount < minBoxSize) return minBoxSize;
      return oldBoxSize - amount;
    })
  }

  function zoomHover(zoomInOrOut: string, color: string) {
    document.querySelectorAll(`.zoom-${zoomInOrOut}-svg`).forEach(svgEl => {
      (svgEl as unknown as HTMLElement).style.fill = `${color}`;
      (svgEl as unknown as HTMLElement).style.stroke = `${color}`;
    })
  }


  function whichAnimalSVG (minion: minionType) {
    return (
      minion.type === 'Squirrel' ? <Squirrel currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Badger' ? <Badger currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Hare' ? <Hare currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Deer' ? <Deer currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Koala' ? <Koala currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Bear' && <Bear currentPlayer={`${minion.alignment}-color`} />
    )
  }



  const user  = useAppSelector((state)=>state.user);

  return(
    <div className="leftBarContainer">
      <div className='flags'>
      <h3 className='p1Name'>{user.username ? user.username:'You'}</h3>
      <div className='p1Flag'>
        <FlagSVG playerClass='p1FlagColor'/>
      </div>
        <h1 className='p2Name'>Isaac</h1>
        <div className='p2Flag'>
          <FlagSVG playerClass='p2FlagColor'/>
        </div>
        <h3 className='score-you'>3</h3>
        <h3 className='score-opponent'>4</h3>
      </div>

      <MediaQuery minWidth={951}>
      <div className='money-time'>
        <h3 className='time-money-text'>Time remaining</h3>
        <h3 className='time-count'>{gameStats.timeRemaining}</h3>
        <h3 className='time-money-text'>Money</h3>
        <h3 className='money-count'>{gameStats.p1Coins}</h3>
      </div>
      <div className='scores'>
      </div>
      </MediaQuery>
      <div className='selected-info'>
      {/* {currentMinion !== null && <h1 className='current-minion-name-left-bar'>{minions[currentMinion].id}</h1>} */}



        {currentMinion !== null && <div className='current-minion-left-bar'>

          <div className='left-just-top'>
            <h1 className='current-minion-name-left-bar'>Jacky</h1>
            <h1 className='current-minion-svg-left-bar'>{whichAnimalSVG(minions[currentMinion])}</h1>
          </div>

          <div className='left-just-two-columns'>
              <h1 className='left-just-text'>Type</h1>
              <h1 className='left-just-stats'>{minions[currentMinion].type}</h1>
          </div>

          <div className='left-just-two-columns'>
            <h1 className='left-just-text'>Alignment</h1>
            <h1 className='left-just-stats'>{minions[currentMinion].alignment}</h1>
          </div>

          <div className='left-just-two-columns'>
              <h1 className='left-just-text'>In tower</h1>
              <h1 className='left-just-stats'>{minions[currentMinion].inTower}</h1>
          </div>

          <div className='left-just-two-columns'>
              <h1 className='left-just-text'>pathFindingAlgo</h1>
              <h1 className='left-just-stats'>{minions[currentMinion].pathFindingAlgo}</h1>
          </div>

          <div className='left-just-two-columns'>
              <h1 className='left-just-text'>sortingAlgo</h1>
              <h1 className='left-just-stats'>{minions[currentMinion].sortingAlgo}</h1>
          </div>

          <div className='left-just-two-columns'>
            <h1 className='left-just-text'>{minions[currentMinion].sortingSpeed}</h1>
            <h1 className='left-just-stats'>{minions[currentMinion].sortingSpeed}</h1>
          </div>

        </div>}


        {currentTower !== null && <div>
          <h1 className='current-tower-name-left-bar'>{currentTower.id}</h1>
          <h1>{currentTower.numbers.join(', ')}</h1>
          {currentTower.minion !== null && <h1>Tower contains minion {currentTower.minion}</h1>}
        </div>}
      </div>

        <div className='zoom-buttons'>
          <div className='zoomInButton' onMouseEnter={() => zoomHover('in', 'var(--yellow)')} onMouseLeave={() => zoomHover('in', 'var(--white-green)')} onClick={() => zoomIn(10)}>
            <ZoomInSVG />
          </div>
          <div className='zoomOutButton' onMouseEnter={() => zoomHover('out', 'var(--yellow)')} onMouseLeave={() => zoomHover('out', 'var(--white-green)')} onClick={() => zoomOut(10)}>
            <ZoomOutSVG />
          </div>
        </div>
    </div>
  );
}

export default LeftBar;
