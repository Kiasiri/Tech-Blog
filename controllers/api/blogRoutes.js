const router = require("express").Router();
const { User, Blog } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newBlogData = await Blog.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const editBlog = await Blog.update(req.body, {
      where: {
        id: req.body.id,
      },
    });

    if (!editBlog) {
      res.status(404).json("No blog found to edit");
    }

    res.status(200).json(editBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const delBlog = await Blog.destroy({
      where: {
        id: req.body.id,
      },
    });
    if (!delBlog) {
      res.status(404).json("no blog found to delete");
      return;
    }
    res.status(200).json(delBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
