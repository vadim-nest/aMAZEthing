import '../css/login.css';
import { Auth0Provider } from "@auth0/auth0-react";

function Login(props:any) {
  
  return(
    <Auth0Provider
    domain={"dev-mujh303ammb4fy01.uk.auth0.com"} //TODO add to .env file(auth0 joseph's domain)
    clientId={"O94ycBixGyrF1fRoyebadt9aJf7MzyRA"} 
    redirectUri={window.location.origin}
    >
      {props.children}
    </Auth0Provider>
  );
}

export default Login;