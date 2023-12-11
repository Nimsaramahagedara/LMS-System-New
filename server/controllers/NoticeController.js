//TODO: CREATE AN API CALLED GET NOTICES
//SHOULD GET THE USER ROLE VIA params
//DEPENDS ON USER ROLEE, SHOULD SEND THE NOTICES BELONGS TO THAT USER ROLE + NOTICES BELONGS TO ALL


const Notice = require('../models/NoticeModel');

exports.getNotices = async (req, res) => {
  try {
    const { role } = req.params;
    // Fetch notices based on user role and 'all'
    const notices = await Notice.find({ $or: [{ audience: role }, { audience: 'all' }] });
    res.status(200).json({ notices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

