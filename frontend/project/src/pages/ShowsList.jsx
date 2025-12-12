import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ShowCard from '../components/ShowCard';
import { useShows } from '../components/context/ShowsContext';
import { FaSearch, FaCalendarAlt, FaFilter, FaTicketAlt, FaSortAmountDown, FaTimes, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const TripsList = () => {
  const { shows, loading, error } = useShows();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const filteredShows = shows.filter(show => {
    const matchesName = show.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = dateFilter ? show.startTime.startsWith(dateFilter) : true;
    const matchesAvailability = show.totalSeats - (show.bookedSeats ? show.bookedSeats.length : 0) > 0;
    
    if (availabilityFilter === 'available' && !matchesAvailability) return false;
    if (availabilityFilter === 'soldout' && matchesAvailability) return false;
    
    return matchesName && matchesDate;
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(a.startTime) - new Date(b.startTime);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'seats') {
      const seatsA = a.totalSeats - (a.bookedSeats ? a.bookedSeats.length : 0);
      const seatsB = b.totalSeats - (b.bookedSeats ? b.bookedSeats.length : 0);
      return seatsB - seatsA;
    }
    if (sortBy === 'location') return a.location?.localeCompare(b.location || '');
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('');
    setPriceFilter('all');
    setAvailabilityFilter('all');
    setSortBy('date');
  };

  const uniqueLocations = [...new Set(shows.map(show => show.location).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Discover Amazing Trips
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Book your seats for exciting trips across amazing destinations
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-md p-4 text-center min-w-[140px]">
              <div className="text-2xl font-bold text-blue-600">{shows.length}</div>
              <div className="text-gray-600 text-sm">Total Trips</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 text-center min-w-[140px]">
              <div className="text-2xl font-bold text-green-600">
                {shows.filter(s => s.totalSeats - (s.bookedSeats ? s.bookedSeats.length : 0) > 0).length}
              </div>
              <div className="text-gray-600 text-sm">Available Now</div>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 text-center min-w-[140px]">
              <div className="text-2xl font-bold text-purple-600">
                {uniqueLocations.length}
              </div>
              <div className="text-gray-600 text-sm">Destinations</div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden mb-6 w-full flex items-center justify-center bg-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <FaFilter className="mr-2 text-blue-600" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          <span className="ml-auto bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
            {filteredShows.length} trips
          </span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Available Trips <span className="text-blue-600">({filteredShows.length})</span>
                  </h2>
                  {shows.length > 0 && (
                    <div className="ml-4 text-gray-600 text-sm hidden md:block">
                      Showing {filteredShows.length} of {shows.length} results
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {(searchTerm || dateFilter || availabilityFilter !== 'all') && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center text-red-600 hover:text-red-700 font-medium"
                    >
                      <FaTimes className="mr-1" />
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {searchTerm && (
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center">
                    Name: {searchTerm}
                    <button onClick={() => setSearchTerm('')} className="ml-2">
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                )}
                {dateFilter && (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                    Date: {dateFilter}
                    <button onClick={() => setDateFilter('')} className="ml-2">
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                )}
                {availabilityFilter !== 'all' && (
                  <span className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full flex items-center">
                    {availabilityFilter === 'available' ? 'Available Only' : 'Sold Out Only'}
                    <button onClick={() => setAvailabilityFilter('all')} className="ml-2">
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                )}
              </div>
            </div>
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="mt-4 text-gray-600">Loading trips...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <div className="text-red-500 text-4xl mb-3">⚠️</div>
                <h3 className="text-lg font-bold text-red-800 mb-2">Error Loading Trips</h3>
                <p className="text-red-600">{error}</p>
              </div>
            ) : filteredShows.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShows.map(show => (
                    <ShowCard key={show._id} show={show} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-gray-400 text-6xl mb-4">✈️</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Trips Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filter criteria</p>
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <FaFilter className="mr-2 text-blue-600" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Reset All
                </button>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FaSearch className="mr-2 text-blue-500" />
                  Search by Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type trip name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  Filter by Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Availability
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Trips', color: 'bg-gray-200' },
                    { id: 'available', label: 'Available Only', color: 'bg-green-200' },
                    { id: 'soldout', label: 'Sold Out Only', color: 'bg-red-200' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setAvailabilityFilter(option.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${option.color} ${availabilityFilter === option.id ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${availabilityFilter === option.id ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Popular Trips
                </label>
                <div className="flex flex-wrap gap-2">
                  {shows.slice(0, 6).map((show) => (
                    <button
                      key={show._id}
                      onClick={() => setSearchTerm(show.name)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors truncate max-w-full"
                      title={show.name}
                    >
                      {show.name.length > 15 ? `${show.name.substring(0, 15)}...` : show.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">Quick Stats</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">{filteredShows.length}</div>
                    <div className="text-xs text-gray-600">Filtered</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-green-600">
                      {filteredShows.filter(s => s.totalSeats - (s.bookedSeats ? s.bookedSeats.length : 0) > 0).length}
                    </div>
                    <div className="text-xs text-gray-600">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {shows.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {shows.slice(0, 4).map((show, index) => (
                <div key={show._id} className="bg-white rounded-xl shadow-md p-4 flex items-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSearchTerm(show.name)}>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <FaTicketAlt className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 truncate">{show.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsList;