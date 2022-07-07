import express from 'express';
import morgan from 'morgan';
var cors = require('cors');    

//const routes = require('./routes/index');
const routes = require('./routes/index')

const app = express();

app.use(morgan('dev'));
// app.use(cors('*'));
app.use((req, res, next) => {
  cors({credentials: true, origin: '*'})
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, auth-token, refresh-token, id');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
 });
 
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', routes);

export default app;