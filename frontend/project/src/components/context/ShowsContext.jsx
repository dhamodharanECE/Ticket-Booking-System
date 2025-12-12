import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchShows } from '../../services/api';

const ShowsContext = createContext();

export const ShowsProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadShows = async () => {
    setLoading(true);
    try {
      const { data } = await fetchShows();
      setShows(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch shows');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadShows();
  }, []);

  return (
    <ShowsContext.Provider value={{ shows, loading, error, loadShows }}>
      {children}
    </ShowsContext.Provider>
  );
};

export const useShows = () => useContext(ShowsContext);