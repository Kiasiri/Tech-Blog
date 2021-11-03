const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
//TODO: make a get all and get by id for comments and blogs
//TODO: make an add blog and and add comment route
//TODO: make an update and delete route for blogs and comments by id?
router.post("/", withAuth, async (req, res) => {
  try {
    const newCommentData = await Comment.create({
      ...req.body,
      comment_id: req.session.user_id,
    });
    res.status(200).json(newCommentData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
