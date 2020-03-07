const comments = require('express').Router();
const { getAllComments, addSingleComment, editSingleComment, deleteComment} = require('../queries/comments');

comments.get("/:post_id", getAllComments);

comments.post("/:post_id", addSingleComment);

comments.patch("/:id", editSingleComment);

comments.delete("/:post_id/:user_id", deleteComment);

module.exports = comments;