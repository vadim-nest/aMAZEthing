import '../css/leftBar.css';
import { TowerType } from '../utils/types';
import FlagSVG from './flagSVG';
import MediaQuery from 'react-responsive';
import { useAppSelector } from '../features/hooks';
// import zoomInSVG from '../assets/game-different/search-3079.svg'
// import zoomOutSVG from '../assets/game-different/search-3080.svg'
import React from 'react';
// import ZoomInOutSVG from './zoomButtonsSVG';
import { ZoomInSVG, ZoomOutSVG } from './zoomButtonsSVG'

function LeftBar({setBoxSize, minBoxSize, maxBoxSize, currentMinion, currentTile, currentTower, setCurrentTower}: {
  setBoxSize: React.Dispatch<React.SetStateAction<number>>,
  minBoxSize: number,
  maxBoxSize: number,
  currentMinion: null | number,
  currentTile: null | {xPos:number, yPos:number},
  currentTower: null | TowerType,
  setCurrentTower: React.Dispatch<React.SetStateAction<null | TowerType>>
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

  // function zoomInHover() {
  //   document.querySelectorAll('.zoom-in-svg').forEach(svgEl => {
  //     (svgEl as unknown as HTMLElement).style.fill = 'var(--yellow)';
  //     (svgEl as unknown as HTMLElement).style.stroke = 'var(--yellow)';
  //   })
  // }

  // function zoomInOffHover() {
  //   document.querySelectorAll('.zoom-in-svg').forEach(svgEl => {
  //     (svgEl as unknown as HTMLElement).style.fill = 'var(--white-green)';
  //     (svgEl as unknown as HTMLElement).style.stroke = 'var(--white-green)';
  //   })
  // }

  function zoomHover(zoomInOrOut: string, color: string) {
    document.querySelectorAll(`.zoom-${zoomInOrOut}-svg`).forEach(svgEl => {
      (svgEl as unknown as HTMLElement).style.fill = `${color}`;
      (svgEl as unknown as HTMLElement).style.stroke = `${color}`;
    })
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
        <h3 className='time-count'>1:29</h3>
        <h3 className='time-money-text'>Money</h3>
        <h3 className='money-count'>200</h3>
      </div>
      <div className='scores'>
      </div>
      </MediaQuery>

      {currentMinion !== null && <h1>The current minion is {currentMinion}</h1>}
      {currentTower !== null && <div>
        <h1>The current tower is {currentTower.id}</h1>
        <h1>{currentTower.numbers.join(', ')}</h1>
        {currentTower.minion !== null && <h1>Tower contains minion {currentTower.minion}</h1>}
        </div>}

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
