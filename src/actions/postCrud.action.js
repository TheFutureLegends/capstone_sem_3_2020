import slugify from "slugify";
import db from "../models/index.js";
import postClasses from "../classes/post.class.js";

const User = db.user;

const Post = db.post;

const createPost = (body, file, userId, categoryId) => {
  const post = new Post({
    title: body.title,
    slug: slugify(body.title.toLowerCase()),
    description: body.description,
    author: userId,
    category: categoryId,
  });

  post.image = process.env.APP_URL + "/static/upload/" + file.filename;

  post.save((err, post) => {
    if (err) {
      return {
        status: 400,
        message: err.message,
      };
    }
  });

  return {
    status: 200,
    message: "Post Created Successfully",
  };
};

const readPost = (posts) => {
  const result = [];

  const postClass = new postClasses();

  posts.forEach((value, index) => {
    postClass.setPost = value;

    result.push(postClass.getPost());
  });

  return result;
};

const editPost = () => {};

const updatePost = () => {};

const deletePost = () => {};

const postCrud = {
  createPost,
  readPost,
  editPost,
  updatePost,
  deletePost,
};

export default postCrud;
