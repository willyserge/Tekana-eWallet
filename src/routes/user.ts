import express from 'express';

import controller from '../controllers/user.controller';

const authRouter = express.Router();

authRouter.post('/register', controller.register);
authRouter.post('/login', controller.login);

export default authRouter;
