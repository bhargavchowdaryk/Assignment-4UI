const Post = require('../models/post');
const User = require('../models/user');

const createPost = async (userId, postData) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const post = new Post({
      ...postData,
      author: userId,
    });

    const savedPost = await post.save();
    return savedPost;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId).populate('author');
    return post;
  } catch (error) {
    throw new Error('Failed to fetch post');
  }
};

const updatePostById = async (postId, userId, updateData) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.author.toString() !== userId) {
      throw new Error('You are not authorized to update this post');
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
    });
    return updatedPost;
  } catch (error) {
    throw new Error('Failed to update post');
  }
};

const deletePostById = async (postId, userId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.author.toString() !== userId) {
      throw new Error('You are not authorized to delete this post');
    }

    const deletedPost = await Post.findByIdAndDelete(postId);
    return deletedPost;
  } catch (error) {
    throw new Error('Failed to delete post');
  }
};

module.exports = {
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
};