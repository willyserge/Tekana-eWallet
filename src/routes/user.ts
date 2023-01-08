import express from 'express';

import controller from '../controllers/user.controller';

const authRouter = express.Router();

authRouter.post('/register', controller.register);

export default authRouter;
