import app from './app';
import dbConnection  from './db/index';

// Start the application by listening to specific port
const port = Number(process.env.PORT || 3001);

const main = async () => {
  await dbConnection();
  app.listen(port, () => {
    console.info('Started on port: ' + port);
  });
}

main();