const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'foodOrderingSystem';

// Route to handle form submission
app.post('/api/vendors', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Get reference to the database
    const db = client.db(dbName);

    // Insert vendor data into MongoDB
    const result = await db.collection('vendors').insertOne(req.body);

    // Close the connection
    await client.close();

    res.status(201).send('Vendor added successfully');
  } catch (error) {
    console.error('Error adding vendor:', error);
    res.status(500).send('Internal server error');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
