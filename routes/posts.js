const express = require('express');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const router = express.Router();

router.get('/:channel', async (req, res) => {
  const posts = await Post.find({ channel: req.params.channel });
  res.json(posts);
});

router.post('/', auth, async (req, res) => {
  const { channel, title, content } = req.body;
  const newPost = new Post({ channel, title, content, author: req.userId });
  await newPost.save();
  res.status(201).json(newPost);
});

module.exports = router;
