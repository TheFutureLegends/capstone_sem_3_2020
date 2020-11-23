import db from "../../models/index.js";
import commentCrud from "../../actions/commentCrud.action.js";
import commentClasses from "../../classes/comment.class.js";

const Post = db.post;

const Comment = db.comment;

const commentClass = new commentClasses();

const readComment = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.post_id,
      parent: null,
    })
      .populate("author")
      .exec();

    const result = commentCrud.readComment(comments);

    return res.status(200).send({ comments: result });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const createComment = async (req, res) => {
  // Validate input
  const { error } = validationRules.commentValidation.commentSchema.validate(
    req.body
  );
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const post = await Post.findById(req.params.post_id).exec();

    const commentCondition = commentCrud.createComment(
      req.body,
      post._id,
      req.userId
    );

    return res
      .status(commentCondition.status)
      .send({ message: commentCondition.message });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const editComment = async (req, res) => {};

const updateComment = async (req, res) => {};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.comment_id,
      post: req.params.post_id,
    }).exec();

    const commentCondition = commentCrud.deletePost(comment);

    return res
      .status(commentCondition.status)
      .send({ message: commentCondition.message });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const commentController = {
  readComment,
  createComment,
  editComment,
  updateComment,
  deleteComment,
};

export default commentController;
