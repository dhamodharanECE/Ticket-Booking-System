import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  FaTicketAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaUser, 
  FaQrcode,
  FaDownload,
  FaPrint,
  FaTrash,
  FaFilter,
  FaSearch
} from 'react-icons/fa';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [user, setUser] = useState(null);

  const sampleBookings = [
    {
      id: 'BK001',
      tripName: 'New York Express',
      location: 'New York City',
      date: '2024-12-25',
      time: '09:00 AM',
      departureTime: '2024-12-25T09:00:00',
      seats: ['A1', 'A2'],
      totalPrice: 50,
      status: 'confirmed',
      bookingDate: '2024-12-20',
      tripType: 'bus',
      bookingId: 'BOOK-12345'
    },
    {
      id: 'BK002',
      tripName: 'Los Angeles Adventure',
      location: 'Los Angeles',
      date: '2024-12-28',
      time: '02:30 PM',
      departureTime: '2024-12-28T14:30:00',
      seats: ['B3'],
      totalPrice: 35,
      status: 'pending',
      bookingDate: '2024-12-22',
      tripType: 'flight',
      bookingId: 'BOOK-12346'
    },
    {
      id: 'BK003',
      tripName: 'Miami Beach Tour',
      location: 'Miami',
      date: '2025-01-05',
      time: '10:00 AM',
      departureTime: '2025-01-05T10:00:00',
      seats: ['C1', 'C2', 'C3'],
      totalPrice: 90,
      status: 'confirmed',
      bookingDate: '2024-12-18',
      tripType: 'cruise',
      bookingId: 'BOOK-12347'
    },
    {
      id: 'BK004',
      tripName: 'Las Vegas Night Tour',
      location: 'Las Vegas',
      date: '2025-01-10',
      time: '08:00 PM',
      departureTime: '2025-01-10T20:00:00',
      seats: ['D4'],
      totalPrice: 45,
      status: 'cancelled',
      bookingDate: '2024-12-15',
      tripType: 'bus',
      bookingId: 'BOOK-12348'
    },
    {
      id: 'BK005',
      tripName: 'San Francisco Coastal',
      location: 'San Francisco',
      date: '2025-01-15',
      time: '11:00 AM',
      departureTime: '2025-01-15T11:00:00',
      seats: ['E1', 'E2'],
      totalPrice: 60,
      status: 'confirmed',
      bookingDate: '2024-12-10',
      tripType: 'train',
      bookingId: 'BOOK-12349'
    },
    {
      id: 'BK006',
      tripName: 'Chicago City Tour',
      location: 'Chicago',
      date: '2025-01-20',
      time: '09:30 AM',
      departureTime: '2025-01-20T09:30:00',
      seats: ['F3', 'F4', 'F5'],
      totalPrice: 75,
      status: 'confirmed',
      bookingDate: '2024-12-05',
      tripType: 'bus',
      bookingId: 'BOOK-12350'
    }
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('mockUserDB'));
    setUser(userData);

    const loadBookings = () => {
      setLoading(true);
      try {
        setBookings(sampleBookings);
        setFilteredBookings(sampleBookings);
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = bookings;
    
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.tripName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }
    
    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return '✓';
      case 'pending': return '⏳';
      case 'cancelled': return '✗';
      default: return '?';
    }
  };

  const getTripTypeIcon = (type) => {
    switch(type) {
      case 'bus': return '🚌';
      case 'train': return '🚂';
      case 'flight': return '✈️';
      case 'cruise': return '🚢';
      default: return '🎫';
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
      alert('Booking cancelled successfully!');
    }
  };

  const handleDownloadTicket = (booking) => {
    // Mock ticket download
    alert(`Downloading ticket for ${booking.tripName} (${booking.bookingId})`);
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
              <p className="text-gray-600">View and manage all your trip bookings</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <FaUser className="text-blue-500" />
                <span className="font-medium text-gray-700">{user?.name || 'Guest User'}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">{filteredBookings.length} bookings</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-2xl font-bold text-blue-600">{bookings.length}</div>
              <div className="text-gray-600 text-sm">Total Bookings</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-gray-600 text-sm">Confirmed</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div className="text-gray-600 text-sm">Pending</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="text-2xl font-bold text-gray-600">
                ${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}
              </div>
              <div className="text-gray-600 text-sm">Total Spent</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by trip name, location, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FaFilter className="text-gray-500 mr-2" />
                <span className="text-gray-700 mr-2">Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🎫</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Bookings Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'No bookings match your search criteria'
                : 'You haven\'t made any bookings yet'
              }
            </p>
            {searchTerm || statusFilter !== 'all' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            ) : (
              <Link
                to="/home"
                className="inline-block bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Trips
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Booking Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-xl mr-2">{getTripTypeIcon(booking.tripType)}</span>
                        <h3 className="text-xl font-bold truncate">{booking.tripName}</h3>
                      </div>
                      <div className="flex items-center text-sm text-blue-100">
                        <FaTicketAlt className="mr-2" />
                        Booking ID: {booking.bookingId}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)} {booking.status.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Location and Date/Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <FaMapMarkerAlt className="text-red-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Destination</div>
                          <div className="font-bold text-gray-800">{booking.location}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <FaCalendarAlt className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Departure Date</div>
                          <div className="font-bold text-gray-800">{booking.date}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="bg-purple-100 p-2 rounded-lg mr-3">
                          <FaClock className="text-purple-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Departure Time</div>
                          <div className="font-bold text-gray-800">{booking.time}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                          <FaUser className="text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Booked Seats</div>
                          <div className="font-bold text-gray-800">{booking.seats.join(', ')}</div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-500">Booking Date</div>
                          <div className="font-medium">{booking.bookingDate}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Total Amount</div>
                          <div className="text-2xl font-bold text-green-600">${booking.totalPrice}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleDownloadTicket(booking)}
                        className="flex items-center bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <FaDownload className="mr-2" />
                        Ticket
                      </button>
                      
                      <button
                        onClick={() => window.print()}
                        className="flex items-center bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <FaPrint className="mr-2" />
                        Print
                      </button>
                      
                      <button
                        onClick={() => navigator.clipboard.writeText(booking.bookingId)}
                        className="flex items-center bg-purple-100 text-purple-700 hover:bg-purple-200 font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <FaQrcode className="mr-2" />
                        Copy ID
                      </button>
                      
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="flex items-center bg-red-100 text-red-700 hover:bg-red-200 font-medium py-2 px-4 rounded-lg transition-colors ml-auto"
                        >
                          <FaTrash className="mr-2" />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions Footer */}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Need help with this booking?</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Trips Section */}
        {bookings.filter(b => new Date(b.departureTime) > new Date() && b.status === 'confirmed').length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Trips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bookings
                .filter(b => new Date(b.departureTime) > new Date() && b.status === 'confirmed')
                .slice(0, 3)
                .map((booking) => (
                  <div key={booking.id} className="bg-white rounded-xl shadow-md p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white font-bold">{getTripTypeIcon(booking.tripType)}</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 truncate">{booking.location}</div>
                        <div className="text-sm text-gray-500">{booking.date} • {booking.time}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Departing in {Math.ceil((new Date(booking.departureTime) - new Date()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Travel Tips */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Travel Tips & Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-blue-600 text-lg font-bold mb-2">Check-in</div>
              <p className="text-gray-600 text-sm">Arrive at least 1 hour before departure for domestic trips, 2 hours for international.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-green-600 text-lg font-bold mb-2">Documents</div>
              <p className="text-gray-600 text-sm">Carry a valid photo ID and your booking confirmation.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-purple-600 text-lg font-bold mb-2">Cancellation</div>
              <p className="text-gray-600 text-sm">Cancel at least 24 hours before departure for a full refund.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;