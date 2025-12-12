import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const BookingStatus = ({ status }) => {
  if (!status) return null;

  const getStatusConfig = (status) => {
    const configs = {
      'CONFIRMED': {
        icon: <FaCheckCircle />,
        classes: 'bg-green-100 text-green-800 border-green-300',
        iconClasses: 'text-green-500'
      },
      'PENDING': {
        icon: <FaClock />,
        classes: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        iconClasses: 'text-yellow-500'
      },
      'CANCELLED': {
        icon: <FaTimesCircle />,
        classes: 'bg-red-100 text-red-800 border-red-300',
        iconClasses: 'text-red-500'
      },
      'FAILED': {
        icon: <FaExclamationCircle />,
        classes: 'bg-gray-100 text-gray-800 border-gray-300',
        iconClasses: 'text-gray-500'
      }
    };

    return configs[status] || {
      icon: <FaClock />,
      classes: 'bg-blue-100 text-blue-800 border-blue-300',
      iconClasses: 'text-blue-500'
    };
  };

  const config = getStatusConfig(status);

  return (
    <div className={`border-l-4 ${config.classes.split(' ')[2]} ${config.classes.replace('border-', 'bg-').replace('-300', '-50')} p-4 mt-4 rounded-r-lg shadow-sm`}>
      <div className="flex items-center">
        <div className={`p-2 rounded-full ${config.classes.replace('border-', 'bg-').replace('-100', '-200')}`}>
          <span className={`text-xl ${config.iconClasses}`}>
            {config.icon}
          </span>
        </div>
        <div className="ml-3">
          <div className="text-sm font-semibold">Booking Status</div>
          <div className="text-lg font-bold flex items-center">
            {status}
            {status === 'CONFIRMED' && (
              <span className="ml-2 animate-pulse">✓</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatus;