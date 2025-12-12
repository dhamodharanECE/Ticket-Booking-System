import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaTicketAlt, FaPhone, FaClock, FaCheck } from 'react-icons/fa';

const BookingModal = ({ selectedSeats, totalPrice, showName, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onConfirm(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Complete Your Booking</h2>
              <p className="text-blue-100 text-sm mt-1">Secure your seats for {showName}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side: Booking Summary */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaTicketAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{showName}</h3>
                  <p className="text-gray-600 text-sm">Booking Details</p>
                </div>
              </div>

              {/* Selected Seats */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">Selected Seats ({selectedSeats.length})</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {selectedSeats.map(seat => (
                    <div key={seat.number} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-800">Seat {seat.number}</span>
                          <span className="block text-xs text-gray-500 mt-1">{seat.row} Row</span>
                        </div>
                        <span className="font-bold text-blue-600">${seat.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Amount */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">Total Amount</span>
                    <p className="text-sm text-gray-500">Including all taxes</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">${totalPrice}</div>
                    <p className="text-sm text-gray-500 mt-1">For {selectedSeats.length} seat(s)</p>
                  </div>
                </div>
              </div>

              {/* Time Warning */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <FaClock className="text-yellow-600 mt-1" />
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-yellow-800">Booking Time Limit</h4>
                    <div className="mt-1 text-sm text-yellow-700">
                      <p>You have <span className="font-bold">2 minutes</span> to complete this booking</p>
                      <div className="mt-2 w-full bg-yellow-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking ID */}
              <div className="mt-6 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600">
                  Booking ID: <span className="font-mono font-bold text-gray-800">{formData.userId}</span>
                </p>
              </div>
            </div>

            {/* Right Side: Booking Form */}
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Personal Details</h3>
                <p className="text-gray-600">Please provide your contact information</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <FaUser className="text-gray-400 mr-2" />
                      Full Name *
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none pl-10"
                      placeholder="John Doe"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-400 mr-2" />
                      Email Address *
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none pl-10"
                      placeholder="john@example.com"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center">
                      <FaPhone className="text-gray-400 mr-2" />
                      Phone Number
                    </div>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none pl-10"
                      placeholder="+1 (555) 123-4567"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                {/* Payment Method (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      className="border border-gray-300 rounded-lg p-3 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="font-medium text-gray-700">Credit Card</div>
                    </button>
                    <button
                      type="button"
                      className="border border-gray-300 rounded-lg p-3 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="font-medium text-gray-700">PayPal</div>
                    </button>
                    <button
                      type="button"
                      className="border border-gray-300 rounded-lg p-3 hover:border-blue-500 hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="font-medium text-gray-700">Wallet</div>
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:ring-4 focus:ring-emerald-300 focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCheck className="mr-2" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>

                {/* Security Note */}
                <div className="text-center pt-4">
                  <p className="text-xs text-gray-500">
                    <svg className="inline-block w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;