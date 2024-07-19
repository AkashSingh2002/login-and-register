const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');  // For password hashing
const UserModel = require('./models/user');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { name, dateOfBirth, email, password } = req.body;

    // Validate input if necessary
    if (!name || !dateOfBirth || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({ name, dateOfBirth, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      // Check the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.json("success");
      } else {
        res.status(400).json("Incorrect password");
      }
    } else {
      res.status(404).json("Email not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error occurred");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
