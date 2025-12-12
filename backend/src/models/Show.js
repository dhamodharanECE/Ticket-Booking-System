const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  totalSeats: { type: Number, required: true },
  bookedSeats: [{ type: Number }] 
}, { timestamps: true });

module.exports = mongoose.model('Show', ShowSchema);