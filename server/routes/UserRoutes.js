import express from 'express';
import { CreateAccount, Login } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/login', Login);
userRouter.post('/create', CreateAccount);

export default userRouter;