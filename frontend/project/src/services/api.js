import axios from 'axios';
const API = axios.create({ baseURL: 'https://ticket-booking-system-1-s01t.onrender.com/api' });

export const fetchShows = () => API.get('/shows');
export const fetchShowById = (id) => API.get(`/shows/${id}`);
export const createShow = (showData) => API.post('/admin/shows', showData);
export const bookSeats = (bookingData) => API.post('/shows/book', bookingData);

export default API;