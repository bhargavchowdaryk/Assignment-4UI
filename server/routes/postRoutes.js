const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

// Create a new post
router.post('/posts', async (req, res) => {
  try {
    const post = await postController.createPost(req.body);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read post details by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await postController.getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update post details by ID
router.put('/posts/:id', async (req, res) => {
  try {
    const post = await postController.updatePostById(req.params.id, req.body);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post by ID
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await postController.deletePostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;