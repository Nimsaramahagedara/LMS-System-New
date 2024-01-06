import AttendanceModel from '../models/AttendanceModel.js';
import ClassModel from "../models/ClassModel.js";
// Adjust the path accordingly

export const submitAttendance = async (req, res) => {
    const { selectedStudents } = req.body;
    const teacherId = req.loggedInId
    const classId = await ClassModel.findOne({ ownedBy: teacherId });

    try {
        // Save attendanceData to the database using the Attendance model
        const newAttendance = new AttendanceModel({
            attendedStudents: selectedStudents,
            ownedBy: teacherId,
            classId: classId._id,
        });

        await newAttendance.save();

        res.status(200).json({ message: 'Attendance submitted successfully' });
    } catch (error) {
        console.error('Error saving attendance:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getAttendanceByOwnerId = async (req, res) => {
    const ownerUserId = req.loggedInId; // Assuming ownerId is a parameter in the request URL

    try {
        // Fetch attendance data based on the ownedBy ID
        const attendanceData = await AttendanceModel.find({ ownedBy: ownerUserId })
            .populate('attendedStudents') // Populate attendedStudents with user details if needed
            .populate('classId'); // Populate classId with class details if needed

        res.status(200).json({ attendanceData });
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteAttendance = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedAttendance = await AttendanceModel.findByIdAndDelete(id);
  
      if (!deletedAttendance) {
        return res.status(404).json({ error: "Attendance not found" });
      }
  
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


  export const getAttendanceByStudentId = async (req, res) => {
    const { id } = req.params;

    try {
        // Find attendance data for the given attendedStudents ID
        const attendanceData = await AttendanceModel.find({
            attendedStudents: { $in: [id] }
        }).populate('classId').exec();

        res.status(200).json({ attendanceData });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};