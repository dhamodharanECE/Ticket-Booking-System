import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock,
  FaArrowRight
} from 'react-icons/fa';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Sample booking data with only location, date, and time
  const sampleBookings = [
    {
      id: 'BK001',
      location: 'New York City',
      date: '2024-12-25',
      time: '09:00 AM',
      departureTime: '2024-12-25T09:00:00',
      status: 'confirmed'
    },
    {
      id: 'BK002',
      location: 'Los Angeles',
      date: '2024-12-28',
      time: '02:30 PM',
      departureTime: '2024-12-28T14:30:00',
      status: 'confirmed'
    },
    {
      id: 'BK003',
      location: 'Miami',
      date: '2025-01-05',
      time: '10:00 AM',
      departureTime: '2025-01-05T10:00:00',
      status: 'confirmed'
    },
    {
      id: 'BK004',
      location: 'Las Vegas',
      date: '2025-01-10',
      time: '08:00 PM',
      departureTime: '2025-01-10T20:00:00',
      status: 'cancelled'
    },
    {
      id: 'BK005',
      location: 'San Francisco',
      date: '2025-01-15',
      time: '11:00 AM',
      departureTime: '2025-01-15T11:00:00',
      status: 'confirmed'
    },
    {
      id: 'BK006',
      location: 'Chicago',
      date: '2025-01-20',
      time: '09:30 AM',
      departureTime: '2025-01-20T09:30:00',
      status: 'confirmed'
    }
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('mockUserDB'));
    setUser(userData);

    const loadBookings = () => {
      setLoading(true);
      try {
        // Load from localStorage if available, otherwise use sample data
        const savedBookings = JSON.parse(localStorage.getItem('userBookings')) || [];
        const formattedBookings = savedBookings.length > 0 
          ? savedBookings.map(booking => ({
              id: booking.id,
              location: booking.location,
              date: booking.date,
              time: booking.time,
              departureTime: booking.departureTime,
              status: booking.status
            }))
          : sampleBookings;
        
        setBookings(formattedBookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
        setBookings(sampleBookings);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeStr) => {
    // If it's already formatted as "09:00 AM", return as is
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      return timeStr;
    }
    // Otherwise, parse and format
    const time = new Date(`1970-01-01T${timeStr}`);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-6"></div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Your Bookings</h3>
            <p className="text-gray-500">Please wait while we fetch your trip details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">My Bookings</h1>
              <p className="text-gray-600">All your trip bookings in one place</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">{bookings.length} bookings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">✈️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Bookings Yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't booked any trips yet. Start exploring amazing destinations!
            </p>
            <Link
              to="/home"
              className="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Trips
            </Link>
          </div>
        ) : (
          <>
            {/* Current Bookings */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Current Bookings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings
                  .filter(b => b.status === 'confirmed' && new Date(b.departureTime) >= new Date())
                  .map((booking) => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {/* Location Header */}
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-white mr-3" />
                          <h3 className="text-xl font-bold truncate">{booking.location}</h3>
                        </div>
                      </div>

                      {/* Date and Time */}
                      <div className="p-6">
                        <div className="space-y-4">
                          {/* Date */}
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3 flex-shrink-0">
                              <FaCalendarAlt className="text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Date</div>
                              <div className="font-bold text-gray-800">{formatDate(booking.date)}</div>
                            </div>
                          </div>

                          {/* Time */}
                          <div className="flex items-start">
                            <div className="bg-purple-100 p-2 rounded-lg mr-3 flex-shrink-0">
                              <FaClock className="text-purple-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Time</div>
                              <div className="font-bold text-gray-800">{formatTime(booking.time)}</div>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                                {getStatusText(booking.status)}
                              </span>
                              <span className="text-xs text-gray-500">
                                Booking #{booking.id.slice(-4)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Past Bookings */}
            {bookings.filter(b => b.status === 'cancelled' || new Date(b.departureTime) < new Date()).length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Past Bookings</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Location
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {bookings
                          .filter(b => b.status === 'cancelled' || new Date(b.departureTime) < new Date())
                          .map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                                  <div className="font-medium text-gray-900">{booking.location}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-gray-900">{formatDate(booking.date)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-gray-900">{formatTime(booking.time)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                                  {getStatusText(booking.status)}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Summary */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {bookings.filter(b => b.status === 'confirmed' && new Date(b.departureTime) >= new Date()).length}
                </div>
                <div className="text-sm opacity-90">Upcoming Trips</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {bookings.filter(b => b.status === 'confirmed' && new Date(b.departureTime) < new Date()).length}
                </div>
                <div className="text-sm opacity-90">Completed Trips</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </div>
                <div className="text-sm opacity-90">Cancelled</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/home"
                  className="flex items-center justify-center bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <FaArrowRight className="mr-2" />
                  Book New Trip
                </Link>
                <button
                  onClick={() => {
                    const allLocations = bookings.map(b => b.location).join(', ');
                    navigator.clipboard.writeText(`My trips: ${allLocations}`);
                    alert('Trip locations copied to clipboard!');
                  }}
                  className="flex items-center justify-center bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Copy All Locations
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-100 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Print Bookings
                </button>
              </div>
            </div>
          </>
        )}

        {/* Location Map Preview */}
        {bookings.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Your Trip Destinations</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(bookings.map(b => b.location))).map((location, index) => (
                <div key={index} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  {location}
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              You've booked trips to {Array.from(new Set(bookings.map(b => b.location))).length} different locations
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;