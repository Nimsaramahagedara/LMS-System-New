import express from 'express';
import { CreateSupportAccount, deleteSupportMember, getAllSupportMembers, getSupportMember, updateSupportMember } from '../controllers/SupportController.js';

const adminRouter = express.Router();

adminRouter.get('/get-all-support',getAllSupportMembers);
adminRouter.get('/get-support/:email',getSupportMember);
adminRouter.put('/update-support/:email',updateSupportMember);
adminRouter.delete('/delete-support/:email', deleteSupportMember);
adminRouter.post('/create-support', CreateSupportAccount);


export default adminRouter;