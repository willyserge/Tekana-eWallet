import express from 'express';
import config from 'config';
import connect from './utils/connect';

const port = config.get<number>('port');

const app = express();

app.listen(port, async () => {
  await connect();
  console.log(`this app is running on port ${port}`);
});
