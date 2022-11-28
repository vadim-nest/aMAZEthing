import '../css/profileGameHistory.css';
import { User } from '@auth0/auth0-react';
import { useAppSelector } from '../features/hooks';
import { useEffect, useState } from 'react';
import coin from '../assets/profile/coin.png';
import TowerSVG from './towerSVG';
import squirrel from '../assets/minions/squirrel.svg';

export default function ProfileGameHistory() {
  const user = useAppSelector((state) => state.user);
  //Im hard coding the data
  const games = [
    {
      amountMinions: 7,
      result: 'VICTORY',
      goldAmount: 200,
      opponentID: 'string',
      towersTaken: 2,
      winner: true,
      startedAt: new Date().toLocaleDateString(),
      finishedAt: new Date().toLocaleDateString(),
      duration: '5:00',
    },
    {
      amountMinions: 7,
      result: 'DEFEAT',
      goldAmount: 200,
      opponentID: 'string',
      towersTaken: 2,
      winner: false,
      startedAt: new Date().toLocaleDateString(),
      finishedAt: new Date().toLocaleDateString(),
      duration: '5:00',
    },
  ];

  return (
    <div className="gameDashboard">
      {games.map((element) => {
        return (
          <div className="match">
            <div className="gameDuration">
              <div>
                {element.winner === true ? <h1 className="result-win">{element.result}</h1> : <h1 className="result-loss">{element.result}</h1>}
              </div>
              <div className="duration"><h3>TIME: {element.duration} min</h3></div>
              <div className="date"><h3>DATE: {element.finishedAt}</h3></div>
            </div>
            <div className="minionStats">
                <img className='image-profile' src={squirrel}/>
                <h3>{element.amountMinions} Minions</h3>
            </div>
            <div className="towerStats">
                <div className='image-profile'>
                  <TowerSVG playerClass='neutralTower' playerClassShadow='p1TowerShadow'/>
                </div>
                <h3>{element.towersTaken} Towers</h3>
            </div>
            <div className="goldStats">
                <img className='image-profile' src={coin}/>
                <h3>{element.goldAmount} Gold</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
