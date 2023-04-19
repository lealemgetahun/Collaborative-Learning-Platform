import express from 'express';
import { respond } from '../../middlewares/respond';
import { forgotPassword } from './forgotPassword';

import { login } from './login';
import { logout } from './logout';

const authRouter = express.Router();

authRouter.post('/login', login, respond);

authRouter.post('/logout', logout, respond);
authRouter.post('/forgotPassword', forgotPassword, respond);

export default authRouter;
