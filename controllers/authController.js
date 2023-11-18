const User = require('../models/User');
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username exists
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the password is correct
    const isValidPassword = await user.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token for authentication
    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const generateToken = (userId) => {

};

module.exports = { register, login };
