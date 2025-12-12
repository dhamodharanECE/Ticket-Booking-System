const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://dhamodharans:pass123@cluster0.sdep6.mongodb.net/ticket_booking'; 
    console.log("Attempting to connect to:", mongoURI);

    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;