import NoticesModel from "../models/NoticeModel.js";

// Create a new notice
const createNotice = async (req, res) => {
  try {
    const { title, description, audience, publishedBy } = req.body;

    // Validate the audience field
    if (!["student", "teacher", "parent", "admin", "support", "all"].includes(audience)) {
      return res.status(400).json({ error: "Invalid audience type" });
    }

    // Validate the publishedBy field
    if (!["teacher", "admin", "support"].includes(publishedBy)) {
      return res.status(400).json({ error: "Invalid publishedBy type" });
    }

    const newNotice = await NoticesModel.create({
      title,
      description,
      audience,
      publishedBy,
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
    const { title, description, audience, publishedBy } = req.body;

    // Validate the audience field
    if (audience && !["student", "teacher", "parent", "admin", "support", "all"].includes(audience)) {
      return res.status(400).json({ error: "Invalid audience type" });
    }

    // Validate the publishedBy field
    if (publishedBy && !["teacher", "admin", "support"].includes(publishedBy)) {
      return res.status(400).json({ error: "Invalid publishedBy type" });
    }

    const updatedNotice = await NoticesModel.findByIdAndUpdate(
      id,
      { title, description, audience, publishedBy },
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

// ...

// Get notices by publishedBy
const getNoticesByPublishedBy = async (req, res) => {
  try {
    const { publishedBy } = req.params;

    // Validate the publishedBy field
    if (!["teacher", "admin", "support"].includes(publishedBy)) {
      return res.status(400).json({ error: "Invalid publishedBy type" });
    }

    const notices = await NoticesModel.find({ publishedBy });

    return res.status(200).json(notices);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
  getNoticesByUserRole,
  getNoticesByPublishedBy, // Add this line
};

