//TODO: CREATE AN API CALLED GET NOTICES
//SHOULD GET THE USER ROLE VIA params
//DEPENDS ON USER ROLEE, SHOULD SEND THE NOTICES BELONGS TO THAT USER ROLE + NOTICES BELONGS TO ALL





const noticeController = {
  getAllNotices: async (req, res) => {
    try {
      const allNotices = await NoticesModel.find();
      res.status(200).json(allNotices);
    } catch (error) {
      console.error('Error fetching notices:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

export default noticeController;




