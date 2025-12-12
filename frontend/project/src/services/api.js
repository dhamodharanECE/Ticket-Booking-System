import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchShows = () => API.get('/shows');
export const fetchShowById = (id) => API.get(`/shows/${id}`);
export const createShow = (showData) => API.post('/admin/shows', showData);
export const bookSeats = (bookingData) => API.post('/shows/book', bookingData);



export default API;