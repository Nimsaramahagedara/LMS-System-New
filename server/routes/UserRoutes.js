import express from 'express';
import { Login } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.post('/login', Login);

export default userRouter;