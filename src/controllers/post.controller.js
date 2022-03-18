const express = require("express");
const { POST_STATUS } = require("../config");
const { verifyAccessToken } = require("../middleware/handle-token");
const postRouter = express.Router();
const postService = require("../services/post.service");

postRouter.post("/create", verifyAccessToken, async (req, res) => {
  try {
    const { title, body } = req.body;

    const post = await postService.findOne({ $or: [{ title }, { body }] });
    if (post) throw new Error("post existed");

    const result = await postService.createOne(req.body);

    res.status(200).json({ message: result });
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

postRouter.get("/list", async (req, res) => {
  try {
    const { page, limit, order } = req.params;
    const post = await postService.findMany(
      { status: POST_STATUS.PUBLIC },
      { path: "author", model: "User", select: "username -_id" }
    );
    res.status(200).json({ message: post });
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

postRouter.get("/list-author", async (req, res) => {
  try {
    const { page, limit, order } = req.params;
    const post = await postService.findMany(
      {
        author: req.userData.id,
        status: POST_STATUS.PUBLIC,
      },
      { path: "author", select: "username -_id" }
    );
    res.status(200).json({ message: post });
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

postRouter.get("/one/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.findOne(
      { id, status: POST_STATUS.PUBLIC },
      { path: "author", model: "User", select: "username -_id" }
    );
    res.status(200).json({ message: post });
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

postRouter.get("/one-author/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postService.findOne(
      { id, author: req.userData.id },
      { path: "author", model: "User", select: "username -_id" }
    );
    res.status(200).json({ message: post });
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

postRouter.post("/update/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id, title, body, date, status } = req.body;
    const post = await postService.findOne({ id, author: req.userData.id });
    if (post) {
      const update = await postService.updateOne(
        { id },
        { title, body, date, status }
      );
      res.status(200).json({ message: update });
    } else {
      throw new Error("Post is not existed");
    }
  } catch (e) {
    res.status(400).json({ message: e.message || String(e) });
  }
});

module.exports = postRouter;
