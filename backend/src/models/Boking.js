const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  seatNumbers: [{ type: Number, required: true }],
  status: { 
    type: String, 
    enum: ['PENDING', 'CONFIRMED', 'FAILED'], 
    default: 'PENDING' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);