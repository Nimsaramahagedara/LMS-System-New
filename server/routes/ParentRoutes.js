import express from 'express';
import { getStudentsWithParent, getStudentsUsingParentId } from '../controllers/ParentController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';


    const parentRoutes = express.Router();

        parentRoutes.get('/get-students', LoginValidator , getStudentsWithParent);
        parentRoutes.get('/get-students-using-parent-id', getStudentsUsingParentId);

    export default parentRoutes;