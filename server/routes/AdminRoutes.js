import express from 'express';
import { CreateSupportAccount } from '../controllers/SupportController.js';

const adminRouter = express.Router();

adminRouter.post('/create-support', CreateSupportAccount);

export default adminRouter;