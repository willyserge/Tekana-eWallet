import express from 'express';
import cookieParser from 'cookie-parser';
import config from 'config';

import connect from './utils/connect';
import logger from './utils/logger';
import authRouter from './routes/user';

const port = config.get<number>('port');

const app = express();

app.use(express.json());
app.use(cookieParser());

// routes

app.use('/api/auth', authRouter);

app.listen(port, async () => {
  await connect();
  logger.info(`this app is running on port ${port}`);
});
