import express from 'express';
import { CreateSupportAccount, deleteSupportMember, getAllSupportMembers, getSupportMember, updateSupportMember } from '../controllers/SupportController.js';
import { CreateTeacherAccount, deleteTeacher, getAllTeachers, getTeacher, updateTeacher } from '../controllers/TeacherContraller.js';
import { getOverview } from '../controllers/AdminControlller.js';


const adminRouter = express.Router();

adminRouter.get('/get-overview',getOverview);
adminRouter.get('/get-all-support',getAllSupportMembers);
adminRouter.get('/get-support/:email',getSupportMember);
adminRouter.put('/update-support/:email',updateSupportMember);
adminRouter.delete('/delete-support/:email', deleteSupportMember);
adminRouter.post('/create-support', CreateSupportAccount);

adminRouter.get('/get-all-teachers',getAllTeachers);
adminRouter.get('/get-teacher/:email',getTeacher);
adminRouter.put('/update-teacher/:email',updateTeacher);
adminRouter.delete('/delete-teacher/:email', deleteTeacher);
adminRouter.post('/create-teacher', CreateTeacherAccount);


export default adminRouter;