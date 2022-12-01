import { Outlet } from "react-router-dom";
import "./App.css";
import Auth0ProviderWithHistory from "./components/auth0Provider";
import socket from './services/socket';


import Navbar from "./components/navbar";

function App(props: any) {
  return (
      <Auth0ProviderWithHistory>
        <div>
          <Navbar />
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </Auth0ProviderWithHistory>
  );
}

export default App;
