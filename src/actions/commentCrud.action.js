import slugify from "slugify";
import db from "../models/index.js";

const Comment = db.comment;

const createComment = (body, postId, userId) => {};

const readComment = () => {};

const editComment = () => {};

const updateComment = () => {};

const deleteComment = () => {};

const commentCrud = {
  createComment,
  readComment,
  editComment,
  updateComment,
  deleteComment,
};

export default commentCrud;
