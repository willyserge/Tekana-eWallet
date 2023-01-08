import jwt from 'jsonwebtoken';
import config from 'config';

const maxAge = config.get<number>('maxAge');
const jwtSecret = config.get<string>('jwtSecret ');

interface JwtInfo {
  name: string;
  email: string;
  password: string;
}

const createAccessToken = (info:JwtInfo) => {
  const token = jwt.sign(
    info,
    jwtSecret,
    { expiresIn: maxAge },
  );
  return token;
};

export default createAccessToken;
