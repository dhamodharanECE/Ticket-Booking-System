import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useShows } from '../components/context/ShowsContext';
import { createShow } from '../services/api';

const AdminDashboard = () => {
  const { shows, loadShows } = useShows();
  const [form, setForm] = useState({ name: '', startTime: '', totalSeats: 40 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createShow(form);
      alert('Show Created Successfully');
      setForm({ name: '', startTime: '', totalSeats: 40 });
      loadShows(); 
    } catch (err) {
      alert('Error creating show');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
          <Navbar />
        </header>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700">Show Management</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {shows.length} {shows.length === 1 ? 'Show' : 'Shows'}
                </span>
              </div>
              
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Show Name
                      </th>
                      <th scope="col" className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Start Time
                      </th>
                      <th scope="col" className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Total Seats
                      </th>
                      <th scope="col" className="px-4 py-3 md:px-6 md:py-4 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shows.map(show => (
                      <tr key={show._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                          <div className="text-sm md:text-base font-medium text-gray-900">{show.name}</div>
                        </td>
                        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                          <div className="text-sm md:text-base text-gray-700">
                            {new Date(show.startTime).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {show.totalSeats} seats
                          </span>
                        </td>
                        <td className="px-4 py-3 md:px-6 md:py-4 whitespace-nowrap text-sm md:text-base text-gray-500">
                          {new Date(show.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {shows.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">No shows created yet</p>
                    <p className="text-gray-400 mt-2">Create your first show using the form on the right</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 sticky top-6">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">Create New Show</h2>
                <p className="text-gray-500 text-sm">Fill in the details to create a new show</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Show Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    placeholder="Enter show name"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input 
                    type="datetime-local" 
                    required
                    value={form.startTime}
                    onChange={e => setForm({...form, startTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                  />
                </div>
                
                <div className="form-group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Seats
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      required
                      min="1"
                      max="1000"
                      value={form.totalSeats}
                      onChange={e => setForm({...form, totalSeats: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none pr-12"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      seats
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Maximum capacity for this show</p>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Create Show
                </button>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Note:</p>
                      <p className="mt-1">Once created, shows cannot be edited. Please double-check all information before submission.</p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;