const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/db/connection');
const apiRoutes = require('./src/routes/ApiRouters');
dotenv.config();
connectDB();
const app = express();
app.use(cors()); 
app.use(express.json());
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
  res.send('Ticket Booking API is running...');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Internal Server Error', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});