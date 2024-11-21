import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// GET /posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /user/posts
router.get("/user/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /posts
router.post("/", authMiddleware, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  try {
    const newPost = Post.create({
      title: title,
      description: description,
      author: req.user._id,
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
