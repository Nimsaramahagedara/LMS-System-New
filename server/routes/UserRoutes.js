import express from 'express';
import { CreateAccount, Login, getUserDetails } from '../controllers/UserController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';

const userRouter = express.Router();

userRouter.get('/get-user',LoginValidator, getUserDetails);
userRouter.post('/login', Login);
userRouter.post('/create', CreateAccount);

export default userRouter;