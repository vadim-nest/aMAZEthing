import Express from 'express';
import { automateImages } from './utils/automateAvatars';
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
  issuerBaseURL: process.env.AUTH0_DOMAIN
}

//cors
const corsConfig = {
  origin: [process.env.URL || 'http://localhost:3000', process.env.CLIENT_URL || 'http://localhost:5173', process.env.AUTH0_DOMAIN || 'https://dev-mujh303ammb4fy01.uk.auth0.com',"https://dev-mujh303ammb4fy01.uk.auth0.com/api/v2/", "https://amaze-thing-dev.com"],
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}

const app = Express();
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config))
app.use(Express.json());
app.use(cors(corsConfig));
app.use(router);

//Upload Avatar images to collection
automateImages();

app.get('/authorize', function (req, res) {
  res.json('Secured Resource');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});