import mongoose from 'mongoose';
import config from 'config';

import logger from './logger';

mongoose.set('strictQuery', false);

async function connect() {
  const dbURI = config.get<string>('dbURI');
  try {
    await mongoose.connect(dbURI);
    logger.info('db connected');
  } catch (error:any) {
    logger.error(error.message);
    process.exit(1);
  }
}

export default connect;
