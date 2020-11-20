import db from "../../models/index.js";

import userClasses from "../../classes/user.class.js";

const User = db.user;

const getProfile = async (req, res) => {
  const user = await User.findById(req.userId).populate("roles").exec();

  if (user) {
    const userClass = new userClasses();

    userClass.userAPI = user;

    return res.status(200).send(userClass.getUser());
  }

  return res.status(500).send({
    message: "Server error. Please reload browser!",
  });
};

export { getProfile };
