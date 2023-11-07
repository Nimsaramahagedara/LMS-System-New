import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import { dbConfig } from './utils/dbConfig.js';


const port = process.env.PORT || 5000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', async (req,res)=>{
    res.status(200).json('Server is up and running');
})

//Put other routes here

//Common Routes

//Student Routes

//Teacher Routes

//Support team Routes

//Parent Routes

dbConfig().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is up and running on port ${port}`);
    })
}).catch((err)=>{
    console.log(err);
})

