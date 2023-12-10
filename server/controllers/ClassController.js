import ClassModel from "../models/ClassModel.js"



export const getAllClasses = async(req,res)=>{
    try {
        const classes = await ClassModel.find();
        
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({
            message:error.mesasge
        })
    }
}

export const getOneClass = async(req,res)=>{
    const {id} = req.params();

    try {
        const isClassExist = await ClassModel.findById(id);
        if(!isClassExist){
            throw Error('That class not exist');
           
        }
        res.status(200).json(isClassExist);
        
    } catch (error) {
        res.status(500).json({
            message:error.mesasge
        })
    }
}

export const createClass = async(req,res)=>{
    const data = req.body

    try {
        const classData = {
            grade: data.grade,
            subClass:data.subClass,
            students:Array(),
            ownedBy:null,
            subjects:Array()
        }

        const isSaved = await ClassModel.create(classData);

        res.status(200).json({message:'Class Created Successfully'})
        
    } catch (error) {
        res.status(500).json({
            message:error.mesasge
        })
    }
}