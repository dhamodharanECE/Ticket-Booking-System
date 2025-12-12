import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaChair, FaTicketAlt, FaArrowRight, FaFire } from 'react-icons/fa';

const ShowCard = ({ show }) => {
  const navigate = useNavigate();
  const availableSeats = show.totalSeats - (show.bookedSeats ? show.bookedSeats.length : 0);
  
  // Calculate seat availability percentage
  const seatPercentage = (availableSeats / show.totalSeats) * 100;
  
  // Determine availability status and color
  const getAvailabilityStatus = () => {
    if (availableSeats === 0) {
      return { text: 'Sold Out', color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' };
    } else if (seatPercentage < 25) {
      return { text: 'Almost Full', color: 'text-orange-600', bg: 'bg-orange-100', border: 'border-orange-200' };
    } else if (seatPercentage < 50) {
      return { text: 'Limited Seats', color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-200' };
    } else {
      return { text: 'Available', color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-200' };
    }
  };

  const availability = getAvailabilityStatus();

  // Format date and time
  const startDate = new Date(show.startTime);
  const formattedDate = startDate.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
  const formattedTime = startDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
      {/* Card Header with Gradient */}
      <div className="relative h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      
      <div className="p-6">
        {/* Show Title */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
              {show.name}
            </h3>
            {show.category && (
              <span className="inline-block mt-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {show.category}
              </span>
            )}
          </div>
          
          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${availability.bg} ${availability.color}`}>
            {availability.text}
          </div>
        </div>

        {/* Date & Time Info */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="text-blue-500 mr-3" />
            <div>
              <div className="text-sm font-medium">{formattedDate}</div>
              <div className="text-xs text-gray-500">Show Date</div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600">
            <FaClock className="text-purple-500 mr-3" />
            <div>
              <div className="text-sm font-medium">{formattedTime}</div>
              <div className="text-xs text-gray-500">Start Time</div>
            </div>
          </div>
        </div>

        {/* Seats Info */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <FaChair className="text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Seat Availability</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg text-gray-800">{availableSeats} / {show.totalSeats}</div>
              <div className="text-xs text-gray-500">Available Seats</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                seatPercentage < 25 ? 'bg-red-500' :
                seatPercentage < 50 ? 'bg-orange-500' :
                seatPercentage < 75 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${seatPercentage}%` }}
            ></div>
          </div>
          
          {/* Seat Status Labels */}
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>

        {/* Price Info (if available) */}
        {show.price && (
          <div className="mb-5 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Starting from</div>
                <div className="text-2xl font-bold text-gray-800">${show.price}</div>
              </div>
              <FaTicketAlt className="text-blue-500 text-xl" />
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <div className="text-xs text-gray-500">Duration</div>
            <div className="font-bold text-gray-800">2h 30m</div>
          </div>
          <div className="bg-gray-50 p-2 rounded-lg text-center">
            <div className="text-xs text-gray-500">Age Rating</div>
            <div className="font-bold text-gray-800">PG-13</div>
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => navigate(`/booking/${show._id}`)}
          className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
            availableSeats === 0 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 shadow-md hover:shadow-lg'
          }`}
          disabled={availableSeats === 0}
        >
          {availableSeats === 0 ? (
            <>
              <FaTimesCircle className="mr-2" />
              Sold Out
            </>
          ) : (
            <>
              <span>View Seats</span>
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>

        {/* Hover Indicator */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            <FaFire className="inline mr-1" />
            Hot
          </div>
        </div>
      </div>

      {/* Card Footer - Venue Info */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <div className="ml-2">
              <div className="text-xs font-medium text-gray-700">Modex Theater</div>
              <div className="text-xs text-gray-500">Main Hall</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {show.venue || 'Downtown Location'}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for times icon
const FaTimesCircle = (props) => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
  </svg>
);

export default ShowCard;