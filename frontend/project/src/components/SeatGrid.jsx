import React from 'react';

const SeatGrid = ({ totalSeats, bookedSeats, selectedSeats, onSeatClick }) => {

  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="seat-grid-container">
      {seats.map((seatNum) => {
        const isBooked = bookedSeats.includes(seatNum);
        const isSelected = selectedSeats.includes(seatNum);
        
        let seatClass = 'seat-box available';
        if (isBooked) seatClass = 'seat-box booked';
        else if (isSelected) seatClass = 'seat-box selected';

        return (
          <div
            key={seatNum}
            className={seatClass}
            onClick={() => !isBooked && onSeatClick(seatNum)}
          >
            {seatNum}
          </div>
        );
      })}
    </div>
  );
};

export default SeatGrid;