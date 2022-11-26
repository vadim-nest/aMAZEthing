import '../css/profile.css';
import { useAuth0, User} from "@auth0/auth0-react";
import { useAppSelector } from '../features/hooks';

function Profile() {
  const user  = useAppSelector((state)=>state.user);

  return (
    <div>
      {
        <h1>HELLO {user.username ?(user as User).username: 'THERE'},</h1>
      }
      <h1>Your learning progress</h1>
      <h2>Sorting Algorithms: {user.sortingPath}</h2>
      <h2>Path Finding Algorithms: {user.pathFindPath}</h2>
      <h1>Your games' stats</h1>
      <h2>Wins: {user.overallWins.wins}</h2>
      <h2>Losses: {user.overallWins.losses}</h2>
      <h2>Draws: {user.overallWins.draws}</h2>
      {user.games?
      <div>
        <h2>Game history</h2>
        <p>user.games.map</p>
      </div>:
      <h2>No games played yet</h2>}
    </div>
  );
}

export default Profile;