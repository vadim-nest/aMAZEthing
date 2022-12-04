import '../../css/leftBar.css';
import { minionType, TowerType } from '../../utils/types';
import FlagSVG from '../svg/flagSVG';
import MediaQuery from 'react-responsive';
import { useAppDispatch, useAppSelector } from '../../features/hooks';
import React from 'react';
import { ZoomInSVG, ZoomOutSVG } from '../svg/zoomButtonsSVG';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from '../svg/animalsSVG';
import TowerSVG from '../svg/towerSVG';
import LeftBarSmall from './leftBarSmall';
import { zoomIn, zoomOut } from '../../features/game_slice';

export function zoomHover(zoomInOrOut: string, color: string) {
  document.querySelectorAll(`.zoom-${zoomInOrOut}-svg`).forEach((svgEl) => {
    (svgEl as unknown as HTMLElement).style.fill = `${color}`;
    (svgEl as unknown as HTMLElement).style.stroke = `${color}`;
  });
}

export function whichAnimalSVG(minion: minionType) {
  return minion.type === 'Squirrel' ? (
    <Squirrel currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Badger' ? (
    <Badger currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Hare' ? (
    <Hare currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Deer' ? (
    <Deer currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Koala' ? (
    <Koala currentPlayer={`${minion.alignment}-color`} />
  ) : (
    minion.type === 'Bear' && (
      <Bear currentPlayer={`${minion.alignment}-color`} />
    )
  );
}

export default function LeftBar (
  {
    currentMinion,
    minions,
    currentTower,
    towers,
    currentPlayer,
  }: {
    currentMinion: null | number;
    currentTower: null | TowerType;
    minions: { [key: number]: minionType };
    towers: TowerType[];
    currentPlayer: string;
  }
) {

  const user = useAppSelector((state) => state.user);
  const {gameStats} = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  
  return (
    <div className="leftBarContainer">
      <div className="flags">
        <h3 className="p1Name">{user.username ? user.username : 'You'}</h3>
        <div className="p1Flag">
          <FlagSVG
            playerName="you"
            playerScore={gameStats.p1Towers.length}
            playerClass="p1FlagColor"
            textReverse="text-reverse-nope"
          />
        </div>
        <h1 className="p2Name">Opponent</h1>
        <div className="p2Flag">
          <FlagSVG
            playerName="Isaac"
            playerScore={gameStats.p2Towers.length}
            playerClass="p2FlagColor"
            textReverse="text-reverse-yep"
          />
        </div>
      </div>

      <div className="money-time">
        <h3 className="time-money-text">Time remaining</h3>
        <h3 className="time-count">{gameStats.timeRemaining}</h3>
        <h3 className="time-money-text">Money</h3>
        <h3 className="money-count price">{currentPlayer === 'p1' ? gameStats.p1Coins : gameStats.p2Coins}</h3>
      </div>
      <div className="scores"></div>
      <div className="selected-info">
        {currentMinion !== null && (
          <div className="current-minion-left-bar">
            <div className="left-just-top">
              <h1 className="current-minion-name-left-bar">
                {minions[currentMinion].name}
              </h1>
              <h1 className="current-minion-svg-left-bar">
                {whichAnimalSVG(minions[currentMinion])}
              </h1>
            </div>

            <h1 className="left-just-stats">{minions[currentMinion].type}</h1>

            <h1 className="left-just-text">ID</h1>
            <h1 className="left-just-stats">{minions[currentMinion].id}</h1>

            <h1 className="left-just-text">Alignment</h1>
            <h1 className="left-just-stats">
              {minions[currentMinion].alignment}
            </h1>

            <h1 className="left-just-text">Path finding</h1>
            <h1 className="left-just-stats">
              {minions[currentMinion].pathFindingAlgo}
            </h1>

            <h1 className="left-just-text">Sorting</h1>
            <h1 className="left-just-stats">
              {minions[currentMinion].sortingAlgo}
            </h1>

            <h1 className="left-just-text">
              {minions[currentMinion].sortingSpeed}
            </h1>
            <h1 className="left-just-stats">
              {minions[currentMinion].sortingSpeed}
            </h1>
          </div>
        )}

        {currentTower !== null && (
          <div>
            {towers.find((tower) => tower.id === currentTower.id)!.alignment ===
            'none' ? (
              <h1 className="current-minion-name-left-bar">unsorted</h1>
            ) : (
              <h1 className="current-minion-name-left-bar">
                {currentTower &&
                  towers.find((tower) => tower.id === currentTower.id)!
                    .alignment}
                's tower
              </h1>
            )}
            {towers.find((tower) => tower.id === currentTower.id)!.alignment ===
            'none' ? (
              <h1 className="current-minion-svg-left-bar">
                {
                  <TowerSVG
                    playerClass={'neutralTower'}
                    playerClassShadow={'neutralTowerShadow'}
                  />
                }
              </h1>
            ) : (
              <h1 className="current-minion-svg-left-bar">
                {
                  <TowerSVG
                    playerClass={
                      towers.find((tower) => tower.id === currentTower.id)!
                        .alignment + '-color'
                    }
                    playerClassShadow={
                      towers.find((tower) => tower.id === currentTower.id)!
                        .alignment + '-color'
                    }
                  />
                }
              </h1>
            )}
            <h1 className="left-bar-tower-array">
              {currentTower &&
                towers
                  .find((tower) => tower.id === currentTower.id)!
                  .numbers.join(', ')}
            </h1>
            {currentTower.minion !== null && (
              <h1 className="left-just-text">
                Tower contains minion{' '}
                {currentTower &&
                  towers.find((tower) => tower.id === currentTower.id)!.minion}
              </h1>
            )}
          </div>
        )}
      </div>

      <div className="zoom-buttons">
        <div
          className="zoomInButton"
          onMouseEnter={() => zoomHover('in', 'var(--yellow)')}
          onMouseLeave={() => zoomHover('in', 'var(--white-green)')}
          onClick={() => dispatch(zoomIn(10))}
        >
          <ZoomInSVG />
        </div>
        <div
          className="zoomOutButton"
          onMouseEnter={() => zoomHover('out', 'var(--yellow)')}
          onMouseLeave={() => zoomHover('out', 'var(--white-green)')}
          onClick={() => dispatch(zoomOut(10))}
        >
          <ZoomOutSVG />
        </div>
      </div>
      {/* <MediaQuery maxWidth={950}>
        <div>
          <LeftBarSmall
            currentTower={currentTower}
            currentMinion={currentMinion}
            minions={minions}
            gameStats={gameStats}
            towers={towers} />
        </div>
      </MediaQuery> */}
    </div>
  );
}