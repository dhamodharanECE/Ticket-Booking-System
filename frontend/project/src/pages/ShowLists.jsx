import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../components/context/AuthContext';
import { FaBus, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaUser, FaStar, FaArrowRight, FaPlane, FaHotel, FaCar, FaMountain } from 'react-icons/fa';

const TRIP_LOCATIONS = [
  { id: 1, name: "Mumbai to Goa", seats: 30, duration: "12h", price: "$89", icon: "🌴", type: "beach" },
  { id: 2, name: "Delhi to Manali", seats: 30, duration: "14h", price: "$95", icon: "🏔️", type: "mountain" },
  { id: 3, name: "Bangalore to Ooty", seats: 30, duration: "6h", price: "$65", icon: "🌿", type: "hill" },
  { id: 4, name: "Chennai to Pondicherry", seats: 30, duration: "3h", price: "$45", icon: "🏖️", type: "beach" },
  { id: 5, name: "Kolkata to Darjeeling", seats: 30, duration: "10h", price: "$75", icon: "🍵", type: "mountain" },
  { id: 6, name: "Hyderabad to Vizag", seats: 30, duration: "8h", price: "$69", icon: "🌊", type: "coastal" },
  { id: 7, name: "Pune to Mahabaleshwar", seats: 30, duration: "4h", price: "$55", icon: "🍓", type: "hill" },
  { id: 8, name: "Jaipur to Udaipur", seats: 30, duration: "7h", price: "$60", icon: "🏰", type: "heritage" },
  { id: 9, name: "Ahmedabad to Diu", seats: 30, duration: "9h", price: "$70", icon: "🏝️", type: "beach" },
  { id: 10, name: "Kochi to Munnar", seats: 30, duration: "5h", price: "$59", icon: "🌱", type: "hill" },
];

const ShowLists = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('trips');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const filteredTrips = TRIP_LOCATIONS.filter(trip =>
    trip.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === 'price-low') return parseInt(a.price.slice(1)) - parseInt(b.price.slice(1));
    if (sortBy === 'price-high') return parseInt(b.price.slice(1)) - parseInt(a.price.slice(1));
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    return a.id - b.id; // default sort by id
  });

  const getUserAvatar = () => {
    if (user.sex === 'M') return '👨';
    if (user.sex === 'F') return '👩';
    return '👤';
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'mountain': return <FaMountain className="text-blue-500" />;
      case 'beach': return "🏖️";
      case 'hill': return "⛰️";
      case 'coastal': return "🌊";
      case 'heritage': return "🏰";
      default: return <FaMapMarkerAlt />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Navbar />
      
      {/* User Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {user.name}!</h1>
              <div className="flex items-center text-indigo-100">
                <FaUser className="mr-2" />
                <span className="mr-4">{user.sex === 'M' ? 'Male' : 'Female'}</span>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Premium Member
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm opacity-90">Bookings</div>
              </div>
              <div className="h-12 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm opacity-90">Rewards</div>
              </div>
              <div className="h-12 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">120</div>
                <div className="text-sm opacity-90">Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search trips by destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration">Duration</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto mb-8 border-b border-gray-200">
          {['shows', 'trips', 'slots'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center px-6 py-3 font-medium text-lg transition-all duration-300 whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab === 'shows' && <FaTicketAlt className="mr-2" />}
              {tab === 'trips' && <FaBus className="mr-2" />}
              {tab === 'slots' && <FaCalendarAlt className="mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <span className="ml-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {tab === 'trips' ? TRIP_LOCATIONS.length : '0'}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div>
          {/* Trips Tab */}
          {activeTab === 'trips' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Available Trips</h2>
                  <p className="text-gray-600">Book your next adventure with comfort and ease</p>
                </div>
                <div className="text-sm text-gray-600">
                  Showing {filteredTrips.length} of {TRIP_LOCATIONS.length} trips
                </div>
              </div>

              {filteredTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTrips.map(trip => (
                    <div
                      key={trip.id}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 cursor-pointer"
                      onClick={() => navigate(`/booking/${trip.id}`)}
                    >
                      {/* Card Header */}
                      <div className="relative h-40 bg-gradient-to-r from-blue-400 to-indigo-500">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 text-gray-800 text-sm font-bold px-3 py-1 rounded-full">
                            {trip.type.charAt(0).toUpperCase() + trip.type.slice(1)}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 text-white text-3xl">
                          {trip.icon}
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white">{trip.name}</h3>
                          <div className="flex items-center text-white/90 text-sm mt-1">
                            <FaBus className="mr-1" />
                            <span>Luxury Coach</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5">
                        {/* Trip Details */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center text-gray-600 mb-1">
                              <FaClock className="mr-2 text-blue-500" />
                              <span className="text-sm">Duration</span>
                            </div>
                            <div className="font-bold text-gray-800">{trip.duration}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center text-gray-600 mb-1">
                              <FaTicketAlt className="mr-2 text-green-500" />
                              <span className="text-sm">Price</span>
                            </div>
                            <div className="font-bold text-gray-800">{trip.price}</div>
                          </div>
                        </div>

                        {/* Seats Info */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-600 font-bold">{trip.seats}</span>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Available Seats</div>
                              <div className="text-xs text-gray-500">Book fast - Limited seats</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Trip ID</div>
                            <div className="font-bold text-gray-800">#{trip.id}</div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center group-hover:translate-y-[-2px]">
                          View Seats
                          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>

                      {/* Card Footer */}
                      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center">
                            <FaStar className="text-yellow-400 mr-1" />
                            <span>4.8</span>
                          </div>
                          <span className="text-blue-600 font-medium">Free Cancellation</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-4">🚌</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Trips Found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </>
          )}

          {/* Shows Tab */}
          {activeTab === 'shows' && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">🎭</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Shows Available</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Currently, there are no shows scheduled. Check back later for upcoming events and performances.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-gray-100 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors">
                  <FaCalendarAlt className="inline mr-2" />
                  Set Reminder
                </button>
                <button
                  onClick={() => setActiveTab('trips')}
                  className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Trips Instead
                </button>
              </div>
            </div>
          )}

          {/* Slots Tab */}
          {activeTab === 'slots' && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">⏰</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Slots Available</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                All time slots are currently booked. New slots will be released soon.
              </p>
              <div className="inline-flex flex-col items-center">
                <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <FaClock className="text-blue-500 mr-2" />
                    <span className="font-medium text-blue-700">Next slot release: Tomorrow 10 AM</span>
                  </div>
                </div>
                <button className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                  Get Notified
                </button>
              </div>
            </div>
          )}
        </div>

        {activeTab === 'trips' && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
                <p className="text-gray-600">Most booked trips this month</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TRIP_LOCATIONS.slice(0, 3).map(trip => (
                <div key={trip.id} className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-5 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{trip.icon}</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                      {trip.price}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{trip.name}</h4>
                  <div className="flex items-center text-white/80">
                    <FaBus className="mr-2" />
                    <span className="text-sm">Departing daily</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Your Travel Stats</h3>
              <p className="text-gray-300">Track your journeys and earn rewards</p>
            </div>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-3xl font-bold">5</div>
                <div className="text-sm text-gray-400">Trips Taken</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">2,450</div>
                <div className="text-sm text-gray-400">Miles Traveled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">120</div>
                <div className="text-sm text-gray-400">Reward Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowLists;