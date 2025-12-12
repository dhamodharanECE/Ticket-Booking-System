import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaUserCog, FaTicketAlt, FaBars, FaTimes, FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('mockUserDB'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mockUserDB');
    navigate('/login');
  };

  const navLinks = [
    { path: '/home', label: 'Home', icon: <FaHome /> },
    { path: '/admin', label: 'Admin', icon: <FaUserCog /> },
    { path: '/bookings', label: 'Bookings', icon: <FaTicketAlt /> },
  ];

  const isActive = (path) => location.pathname === path;

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'U';
    const nameParts = user.name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  };

  const getAvatarColor = () => {
    if (!user || !user.name) return 'from-blue-500 to-purple-500';
    const colors = [
      'from-blue-500 to-purple-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-purple-500 to-pink-500',
      'from-indigo-500 to-blue-500',
    ];
    const index = user.name.length % colors.length;
    return colors[index];
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <FaTicketAlt className="text-white text-xl" />
              </div>
              <Link to="/home" className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ModexTix
                </span>
                <span className="text-xs text-gray-400">Ticket Booking System</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                      : 'hover:bg-gray-700 hover:shadow-md'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                  {isActive(link.path) && (
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
              
              {/* User Profile Dropdown */}
              <div className="relative group ml-4">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className={`w-10 h-10 bg-gradient-to-r ${getAvatarColor()} rounded-full flex items-center justify-center shadow-md`}>
                    <span className="font-bold text-white">{getUserInitials()}</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium truncate max-w-[150px]">
                      {user?.name || 'Guest User'}
                    </div>
                    <div className="text-xs text-gray-400 truncate max-w-[150px]">
                      {user?.email || 'guest@example.com'}
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  {/* User Info Section */}
                  <div className="p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getAvatarColor()} rounded-full flex items-center justify-center shadow-md`}>
                        <span className="font-bold text-white text-lg">{getUserInitials()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white truncate">
                          {user?.name || 'Guest User'}
                        </div>
                        <div className="text-sm text-gray-300 truncate">
                          {user?.email || 'guest@example.com'}
                        </div>
                        {user && (
                          <div className="flex items-center mt-1">
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                              {user.sex === 'M' ? 'Male' : user.sex === 'F' ? 'Female' : 'Other'} • {user.age || 'N/A'} yrs
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* User Details */}
                  <div className="py-2">
                    <div className="px-4 py-3 text-sm text-gray-300 border-b border-gray-700">
                      <div className="flex items-center mb-2">
                        <FaUser className="w-4 h-4 mr-2 text-blue-400" />
                        <span>Account Information</span>
                      </div>
                      {user ? (
                        <div className="space-y-2 mt-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Name:</span>
                            <span className="font-medium">{user.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Email:</span>
                            <span className="font-medium">{user.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Gender:</span>
                            <span className="font-medium">{user.sex === 'M' ? 'Male' : 'Female'}</span>
                          </div>
                          {user.age && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Age:</span>
                              <span className="font-medium">{user.age} years</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic">No user data available</p>
                      )}
                    </div>
                    
                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-200"
                    >
                      <FaSignOutAlt className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                  {isActive(link.path) && (
                    <span className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  )}
                </Link>
              ))}
              
              {/* Mobile User Section */}
              <div className="pt-4 border-t border-gray-700 mt-3">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className={`w-14 h-14 bg-gradient-to-r ${getAvatarColor()} rounded-full flex items-center justify-center shadow-md`}>
                    <span className="font-bold text-white text-xl">{getUserInitials()}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{user?.name || 'Guest User'}</div>
                    <div className="text-sm text-gray-400 truncate">{user?.email || 'guest@example.com'}</div>
                    {user && (
                      <div className="flex items-center mt-1">
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                          {user.sex === 'M' ? 'Male' : user.sex === 'F' ? 'Female' : 'Other'} • {user.age || 'N/A'} yrs
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* User Details in Mobile */}
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center text-gray-300">
                    <FaUser className="w-4 h-4 mr-3 text-blue-400" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">Full Name</div>
                      <div className="font-medium">{user?.name || 'Not available'}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaEnvelope className="w-4 h-4 mr-3 text-blue-400" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-400">Email Address</div>
                      <div className="font-medium truncate">{user?.email || 'Not available'}</div>
                    </div>
                  </div>
                  {user?.age && (
                    <div className="flex items-center text-gray-300">
                      <svg className="w-4 h-4 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                      </svg>
                      <div className="flex-1">
                        <div className="text-sm text-gray-400">Age</div>
                        <div className="font-medium">{user.age} years</div>
                      </div>
                    </div>
                  )}
                  {user?.sex && (
                    <div className="flex items-center text-gray-300">
                      <svg className="w-4 h-4 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="flex-1">
                        <div className="text-sm text-gray-400">Gender</div>
                        <div className="font-medium">{user.sex === 'M' ? 'Male' : 'Female'}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Logout Button */}
                <div className="px-4 py-3 border-t border-gray-700">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Badge - Optional, you can remove if not needed */}
      <div className="fixed top-4 right-4 z-50 md:right-6">
        <button 
          className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          onClick={() => navigate('/bookings')}
          title="View Bookings"
        >
          <FaTicketAlt className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {user?.bookings?.length || 0}
          </span>
        </button>
      </div>
    </>
  );
};

export default Navbar;