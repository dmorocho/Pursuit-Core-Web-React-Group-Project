
const posts = require('express').Router();
const {
  getposts,
  getpost,
  trendingtags,
  getpostbytag,
  newpost,
  editPost,
  deletePost
} = require("../../backend/queries/posts.js");

posts.get("/", getposts); //get all posts
posts.get("/trending", trendingtags);
posts.get("/:userId", getpost); //Get single user's post
posts.get("/tag/:tag", getpostbytag);
posts.post("/", newpost); //Add single post
posts.patch("/:id", editPost); //Edit single post.
posts.delete("/:id", deletePost); //delete post

module.exports = posts;