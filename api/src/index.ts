import app from './app';
import config from '../config.json';
require('./db/index');

// Start the application by listening to specific port
const port = Number(process.env.PORT || config.PORT || 3001);
app.listen(port, () => {
  console.info('Express application started on port: ' + port);
});
