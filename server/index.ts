import Express from 'express';
const { auth } = require('express-openid-connect');
import { OpenidRequest } from 'express-openid-connect';
const { router } = require('./router');
const cors = require('cors');
import jwt from "express-jwt";
import jwks from "jwks-rsa";


import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + '/../.env' });


declare module 'express' {
  interface Request {
      openId?: OpenidRequest
  }
}

const jwksCallback = jwks.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  // JWKS url from the Auth0 Tenant
  jwksUri: "https://klee-test.au.auth0.com/.well-known/jwks.json",
});

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0SECRET, //running openssl rand -hex 32 on the command line
  baseURL: process.env.URL,
  clientID: process.env.AUTH0CLIENTID,
  issuerBaseURL: 'https://dev-mujh303ammb4fy01.uk.auth0.com'
};

const app = Express();
app.use(Express.json());
app.use(router);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))

//cors
const corsConfig = {
  origin: [process.env.URL || 'http://localhost:3000', process.env.CLIENTURL || 'http://localhost:5173'],
  credentials: true,
}
app.use(cors(corsConfig));



app.use((req, res) => {
  res.send('Hello World!')
});

app.listen(3000);