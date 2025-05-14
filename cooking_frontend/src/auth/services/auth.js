import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}/auth/`
  : 'http://localhost:9090/api/auth/';

export const login = async (credentials) => {
  const response = await axios.post(API_URL + 'login', credentials);
  return response.data;
};

export const signup = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData);
  return response.data;
};
