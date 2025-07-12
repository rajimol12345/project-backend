const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Import routers
const UserRouter = require('./router/user');
const AdminRouter = require('./router/Admin');
const MenuRouter = require('./router/menu');
const CartRouter = require('./router/Cart');
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware to allow large base64 JSON and form data
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/food_ordering', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(' MongoDB connection successful'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/food-ordering-app/api/user', UserRouter);   // User routes (login, register, profile, menu)
app.use('/api/admin', AdminRouter);                   // Admin routes (restaurant, menu)
app.use('/api/menu', MenuRouter);
app.use('api/cart',CartRouter)
// Optional: Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
