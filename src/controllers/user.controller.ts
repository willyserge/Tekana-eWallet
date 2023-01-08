import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import logger from '../utils/logger';

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

const login = async () => {
  logger.info('signin function');
};

export default { register, login };
