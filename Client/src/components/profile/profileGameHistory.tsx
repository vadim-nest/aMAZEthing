import '../../css/profileGameHistory.css';
import { useAppSelector } from '../../features/hooks';
import TowerSVG from '../svg/towerSVG';
import { Squirrel } from '../svg/animalsSVG';
import CoinSVG from './coin';

export default function ProfileGameHistory() {
  const user = useAppSelector((state) => state.user);
  //Im hard coding the data
  const games = user.games;

  return (
    <div className="gameDashboard">
      {games.map((element: any, index: number) => {
        console.log(element);
        return (
          <div
            className={` match
          ${element.result === 'win' && 'match-win'}
          ${element.result === 'loss' && 'match-loss'}
          ${element.result === 'draw' && 'match-draw'}
          `}
            key={index}
          >
            <div className="gameDuration">
              <div>
                {element.result === 'win' && (
                  <h1 className="result-win">{element.result}</h1>
                )}
                {element.result === 'loss' && (
                  <h1 className="result-loss">{element.result}</h1>
                )}
                {element.result === 'draw' && (
                  <h1 className="result-draw">{element.result}</h1>
                )}
              </div>
              <div className="duration">
                <h3 className="durationDate">VS: {element.opponentUsername}</h3>
              </div>
              <div className="date">
                <h3 className="durationDate">
                  DATE: {new Date(element.finishedAt).toLocaleString()}
                </h3>
              </div>
            </div>
            <div className="minionStats">
              <div className="image-profile">
                <Squirrel currentPlayer="p1-color" />
              </div>
              <h3 className="gameStatsText">{element.minions} Minions</h3>
            </div>
            <div className="towerStats">
              <div className="image-profile">
                <TowerSVG playerClass="neutralTower" />
              </div>
              <h3 className="gameStatsText">{element.towers} Towers</h3>
            </div>
            <div className="goldStats">
              <div className="image-profile">
                <CoinSVG />
              </div>
              <h3 className="gameStatsText">{element.gold} Gold</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
