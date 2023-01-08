/* eslint-disable comma-dangle */
import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  dbURI: process.env.dbURI,
};
