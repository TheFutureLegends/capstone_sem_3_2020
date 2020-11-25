import db from "../../models/index.js";
import userClasses from "../../classes/user.class.js";

const User = db.user;

const Post = db.post;

const userClass = new userClasses();

const getProfile = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const user = await User.findOne({
      username: req.params.username,
    }).exec();

    const posts = await Post.find({
      author: user._id,
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate(["category", "author"])
      .exec();

    userClass.userAPI = user;

    userClass.userPosts = posts;

    // const user = await User.aggregate([
    //   {
    //     $match: {
    //       username: req.params.username,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       localField: "_id",
    //       foreignField: "author",
    //       as: "posts",
    //     },
    //   },
    //   {
    //     $unwind: "$posts.category",
    //   },
    //   {
    //     $lookup: {
    //       from: "categories",
    //       localField: "posts.category",
    //       foreignField: "_id",
    //       as: "posts.category",
    //     },
    //   },
    //   {
    //     $limit: 1,
    //   },
    // ]).exec();

    return res.status(200).send({ users: userClass.getProfile() });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getUser = async (req, res) => {
  const user = await User.findById(req.userId).populate("roles").exec();

  if (user) {
    userClass.userAPI = user;

    return res.status(200).send(userClass.getUser());
  }

  return res.status(500).send({
    message: "Server error. Please reload browser!",
  });
};

const userController = {
  getProfile,
  getUser,
};

export default userController;
