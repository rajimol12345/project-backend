const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserRouter = require('./router/user');

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
app.use('/food-ordering-app/api/user', UserRouter);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/food_ordering')
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
