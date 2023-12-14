//TODO: CREATE AN API CALLED GET NOTICES
//SHOULD GET THE USER ROLE VIA params
//DEPENDS ON USER ROLEE, SHOULD SEND THE NOTICES BELONGS TO THAT USER ROLE + NOTICES BELONGS TO ALL
import NoticesModel from "../models/NoticeModel.js";

// export const getAllNotices = async (req, res) => {
//   const { userRole } = req.params;
//   let query = {};

//     // If userRole is provided, filter by userRole or 'all'
//     if (userRole) {
//       query = {
//         $or: [
//           { audience: userRole },
//           { audience: 'all' },
//         ],
//       };
//     }

//   try {
//     const allNotices = await NoticesModel.find(query);
//     res.status(200).json(allNotices);
//   } catch (error) {
//     console.error('Error fetching notices:', error);
//     res.status(500).json({ message: error.message });
//   }
// }

// export const createNotice = async(req,res)=>{
//   const data = req.body;

//   try {
//     const createdNotice = await NoticesModel.create(data);
//     res.status(200).json({message:'Notice Published For' + data.audience});
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message:error.message})
//   }
// }


// Create a new notice
const createNotice = async (req, res) => {
  try {
    const { title, description, audience } = req.body;
    
    // Validate the audience field
    if (!["student", "teacher", "parent", "admin", "support", "all"].includes(audience)) {
      return res.status(400).json({ error: "Invalid audience type" });
    }

    const newNotice = await NoticesModel.create({
      title,
      description,
      audience,
    });

    return res.status(201).json(newNotice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all notices
const getAllNotices = async (req, res) => {
  try {
    const notices = await NoticesModel.find();
    return res.status(200).json(notices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a notice
const updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, audience } = req.body;

    // Validate the audience field
    if (audience && !["student", "teacher", "parent", "admin", "support", "all"].includes(audience)) {
      return res.status(400).json({ error: "Invalid audience type" });
    }

    const updatedNotice = await NoticesModel.findByIdAndUpdate(
      id,
      { title, description, audience },
      { new: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    return res.status(200).json(updatedNotice);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a notice
const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNotice = await NoticesModel.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get notices by user role
const getNoticesByUserRole = async (req, res) => {
  try {
    const { userRole } = req.params;

    // Validate the user role
    if (!["student", "teacher", "parent", "admin", "support"].includes(userRole)) {
      return res.status(400).json({ error: "Invalid user role" });
    }

    const notices = await NoticesModel.find({ audience: { $in: [userRole, "all"] } });

    return res.status(200).json(notices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createNotice, getAllNotices, updateNotice, deleteNotice, getNoticesByUserRole };

