const bcrypt = require('bcrypt');
const User = require('../models/user');

const login = async (email, password) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token or perform any other authentication logic
    // ...

    return user;
  } catch (error) {
    throw new Error('Login failed');
  }
};

module.exports = {
  login,
};
