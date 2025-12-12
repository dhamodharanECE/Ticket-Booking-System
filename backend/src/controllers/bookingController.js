const Show = require('../models/Show');
const Booking = require('../models/Boking');

exports.bookSeats = async (req, res) => {
  const { showId, seats } = req.body; 
  try {
    const booking = await Booking.create({
      showId,
      seatNumbers: seats,
      status: 'PENDING'
    });
    const updatedShow = await Show.findOneAndUpdate(
      { 
        _id: showId, 
        bookedSeats: { $nin: seats } 
      },
      { 
        $push: { bookedSeats: { $each: seats } }
      },
      { new: true } 
    );
    if (!updatedShow) {
      await Booking.findByIdAndUpdate(booking._id, { status: 'FAILED' });
      return res.status(409).json({ 
        message: "One or more seats are already booked. Please try again.",
        status: "FAILED" 
      });
    }
    await Booking.findByIdAndUpdate(booking._id, { status: 'CONFIRMED' });
    
    res.status(200).json({ 
      message: "Booking Successful", 
      bookingId: booking._id,
      status: "CONFIRMED"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};