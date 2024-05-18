
const express = require('express');
const debug = require('debug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');
<<<<<<< HEAD:Intraeats/src/server.js
const User = require('./models/User');
=======
require('dotenv').config();
>>>>>>> 1b986d79d9c274122b1ad63fa822cd5c25786aad:Intraeats/server.js



// server.js or app.js
const express = require('express');
const server = express();
const routes = require('./routes');

// Use the merged routes with a base path
app.use('/api', routes);

// Start your server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});




// const User = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("error connecting to database:", err);
  });

// User Model
const User = mongoose.model('User', {
  username: String,
  password: String
});

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create User model
const user = mongoose.model('User', userSchema);

module.exports = User;

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send('Invalid password');
    }
    const token = jwt.sign({ userId: user._id }, 'secret');
    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route for calculating BMI
app.post('/api/bmi', async (req, res) => {
  try {
    const { weight, height } = req.body;
    const bmi = calculateBMI(weight, height);
    res.json({ bmi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

function calculateBMI(weight, height) {
  return (weight / (height * height)).toFixed(2);
}

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(403).send('Forbidden');
    }
    req.userId = decoded.userId;
    next();
  });
};


app.post('/api/users', async (req, res) => {
  try {
    const { name, age, weight, height } = req.body;
    const bmi = calculateBMI(weight, height);
    const user = new User({ name, age, weight, height, bmi });
    await user.save();
    res.json({ bmi });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
