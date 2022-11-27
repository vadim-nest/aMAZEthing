import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = (props:any) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState:any) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={"dev-mujh303ammb4fy01.uk.auth0.com"} //TODO add to .env file(auth0 joseph's domain)
      clientId={"O94ycBixGyrF1fRoyebadt9aJf7MzyRA"} //TODO add to .env file(auth0 joseph's clientID)
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
     {props.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;