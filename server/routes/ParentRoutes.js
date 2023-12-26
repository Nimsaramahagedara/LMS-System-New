import express from 'express';
import { getStudentsWithParent } from '../controllers/ParentController.js';
import { LoginValidator } from '../middlewares/LoggedIn.js';


    const parentRoutes = express.Router();

        parentRoutes.get('/get-students', LoginValidator , getStudentsWithParent);

    export default parentRoutes;