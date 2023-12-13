//TODO: CREATE AN API CALLED GET NOTICES
//SHOULD GET THE USER ROLE VIA params
//DEPENDS ON USER ROLEE, SHOULD SEND THE NOTICES BELONGS TO THAT USER ROLE + NOTICES BELONGS TO ALL
import NoticesModel from "../models/NoticeModel.js";

export const getAllNotices = async (req, res) => {
  const { userRole } = req.params;
  let query = {};

    // If userRole is provided, filter by userRole or 'all'
    if (userRole) {
      query = {
        $or: [
          { audience: userRole },
          { audience: 'all' },
        ],
      };
    }

  try {
    const allNotices = await NoticesModel.find(query);
    res.status(200).json(allNotices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: error.message });
  }
}

export const createNotice = async(req,res)=>{
  const data = req.body;

  try {
    const createdNotice = await NoticesModel.create(data);
    res.status(200).json({message:'Notice Published For' + data.audience});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:error.message})
  }
}



