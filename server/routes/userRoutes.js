const express = require('express');
const userController = require('../controller/userController');
const postController = require('../controller/postController');

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const user = await userController.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read user details by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await userController.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user details by ID
router.put('/users/:id', async (req, res) => {
  try {
    const user = await userController.updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await userController.deleteUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new post for a user
router.post('/users/:userId/posts', async (req, res) => {
  try {
    const post = await postController.createPost(req.params.userId, req.body);
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

// Update post details by ID for a user
router.put('/users/:userId/posts/:postId', async (req, res) => {
  try {
    const post = await postController.updatePostById(
      req.params.postId,
      req.params.userId,
      req.body
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post by ID for a user
router.delete('/users/:userId/posts/:postId', async (req, res) => {
  try {
    const post = await postController.deletePostById(
      req.params.postId,
      req.params.userId
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;