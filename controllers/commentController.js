const commentModel = require("../models/commentModel");

async function createComment(req, res) {
  try {
    const commentData = {
      postId: req.body.postId,
      message: req.body.message,
      userId: req.user.id
    }
    await commentModel.createComment(commentData)

    res.json({
      message: "Comment created successfully."
    })
  } catch(error) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function deleteComment(req, res) {
  try {
    await commentModel.deleteComment(req.params.commentId);
    res.json({
      message: "Comment deleted successfully."
    })
  } catch(error) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createComment,
  deleteComment,
}