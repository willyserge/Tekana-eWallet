import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import config from 'config';

import User from '../models/User';
import logger from '../utils/logger';
import createAccessToken from '../utils/tokenHandler';

const maxAge = config.get<number>('maxAge');

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).send({ error: { msg: 'A user with this email already exists' } });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: passwordHash });

    await newUser.save();
    return res.status(201).json({ success: true });
  } catch (error:any) {
    logger.info(error);
    return res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ msg: 'User does not exist.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send({ msg: 'Incorrect password.' });

    const accessToken = createAccessToken({ id: user._id, email: user.email, name: user.name });
    res.cookie('jwt', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { register, login };
