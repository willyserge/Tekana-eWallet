import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  dbURI: process.env.dbURI,
  salt: process.env.salt,
  jwtSecret: process.env.jwtSecret,
  maxAge: 3 * 24 * 60 * 60 * 1000,
};
