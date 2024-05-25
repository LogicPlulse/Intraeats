
const express = require('express');
const debug = require('debug');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/authRoutes')

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/api/auth', authRoutes);


//mongodb connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.error("error connecting to database:", err);
  });




//start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
