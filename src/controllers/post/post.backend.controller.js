import db from "../../models/index.js";
import postCrud from "../../actions/postCrud.action.js";

const Post = db.post;

const Category = db.category;

const readPost = async (req, res) => {
  // const { limit = 10, page = 1 } = req.query;

  const posts = await Post.find({
    author: {
      _id: req.userId,
    },
  })
    .populate(["author", "category"])
    .exec();

  const result = postCrud.readPost(posts);

  return res.status(200).send({ posts: result });
};

const createPost = async (req, res) => {
  // Validate input
  // const { error } = validationRules.postValidation.postSchema.validate(
  //   req.body
  // );

  // if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findOne({
    slug: req.body.category.toLowerCase(),
  }).exec();

  const postCondition = postCrud.createPost(
    req.body,
    req.file,
    req.userId,
    category._id
  );

  if (!postCondition.status) {
    return res.status(500).send({ message: postCondition.message });
  }

  return res.status(200).send({ message: "Post Created Successfully" });
};

const editPost = async (req, res) => {};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

const postBackend = { readPost, createPost, editPost, updatePost, deletePost };

export default postBackend;
