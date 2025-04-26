import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/user';

export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/getUser`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await axios.post(`${API_URL}/saveUser`, user);
  return response.data;
};
