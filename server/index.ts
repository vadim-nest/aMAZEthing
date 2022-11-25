import Express from 'express';
const { router } = require('./router');
const cors = require('cors');
import {auth} from 'express-openid-connect'
require("dotenv").config();


const config = {
  authRequired: false,
  auth0Logout:true,
  secret: process.env.AUTH0_SECRET || 'averydifficultpassword',
  baseURL: process.env.URL || 'http://localhost:3000',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
  
}

//cors
const corsConfig = {
  origin: [process.env.URL || 'http://localhost:3000', process.env.CLIENT_URL || 'http://localhost:5173'],
  credentials: true,
}

const app = Express();
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))
app.use(Express.json());
app.use(router);
app.use(cors(corsConfig));

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});