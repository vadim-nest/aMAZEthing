import '../css/leftBarSmall.css';
import { useState } from 'react';
import { minionType, TowerType } from '../utils/types';
import FlagSVG from './svg/flagSVG';
import { useAppSelector } from '../features/hooks';
import { ZoomInSVG, ZoomOutSVG } from './svg/zoomButtonsSVG';
import TowerSVG from './svg/towerSVG';
import { zoomIn, zoomOut, zoomHover, whichAnimalSVG } from './leftBar';
import MediaQuery from 'react-responsive';

export default function LeftBarSmall({
  currentMinion,
  minions,
  currentTower,
  gameStats,
  towers,
}: {
  currentMinion: null | number;
  currentTower: null | TowerType;
  minions: { [key: number]: minionType };
  gameStats: {
    timeRemaining: number;
    p1Coins: number;
    p2Coins: number;
    p1Towers: number[];
    p2Towers: number[];
    p1MinionCount: number;
    p2MinionCount: number;
  };
  towers: TowerType[];
}) {
  const [toggle, setToggle] = useState(false);

  const user = useAppSelector((state) => state.user);

  const toggleLeftBar = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <MediaQuery maxWidth={950}>
        <div
          className="container-left-bar"
          onClick={() => {
            toggleLeftBar();
          }}
        >
          <div className={`plus ${toggle}`}>+</div>
          <div className={`minus ${toggle}`}>-</div>
        </div>
      </MediaQuery>
      {/* <MediaQuery maxWidth={950}>
        <div className={`modal-body open-${toggle}`}>
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
            <h3 className="money-count price">{gameStats.p1Coins}</h3>
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

                <h1 className="left-just-stats">
                  {minions[currentMinion].type}
                </h1>

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
                {towers.find((tower) => tower.id === currentTower.id)!
                  .alignment === 'none' ? (
                  <h1 className="current-minion-name-left-bar">unsorted</h1>
                ) : (
                  <h1 className="current-minion-name-left-bar">
                    {currentTower &&
                      towers.find((tower) => tower.id === currentTower.id)!
                        .alignment}
                    's tower
                  </h1>
                )}
                {towers.find((tower) => tower.id === currentTower.id)!
                  .alignment === 'none' ? (
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
                      towers.find((tower) => tower.id === currentTower.id)!
                        .minion}
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
              onClick={() => zoomIn(10)}
            >
              <ZoomInSVG />
            </div>
            <div
              className="zoomOutButton"
              onMouseEnter={() => zoomHover('out', 'var(--yellow)')}
              onMouseLeave={() => zoomHover('out', 'var(--white-green)')}
              onClick={() => zoomOut(10)}
            >
              <ZoomOutSVG />
            </div>
          </div>
        </div>
      </MediaQuery> */}
    </>
  );
}
