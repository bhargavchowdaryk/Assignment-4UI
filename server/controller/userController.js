const bcrypt = require('bcrypt');
const User = require('../models/user');

const createUser = async (userData) => {
  try {
    const { password } = userData;

    // Generate a salt for bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const user = new User({ ...userData, password: hashedPassword });

    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select('-password');
    return user;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

const updateUserById = async (userId, updateData) => {
  try {
    const { password } = updateData;

    if (password) {
      // Generate a salt for bcrypt
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      // Hash the updated password using the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update the password in the updateData object
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

const deleteUserById = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (error) {
    throw new Error('Failed to delete user');
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
