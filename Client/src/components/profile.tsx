import '../css/profile.css';
import { useAuth0, User} from "@auth0/auth0-react";

function Profile() {
  const { user } = useAuth0();

  return (
    <div>
      {
        <h1>HELLO, {(user as User).name}</h1>
      }
      <h1>Your learning progress</h1>
      <h1>Your games' stats</h1>
    </div>
  );
}

export default Profile;