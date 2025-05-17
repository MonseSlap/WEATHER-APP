import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const fetchWeather = async (location) => {
  const response = await axios.get(`${API_URL}/weather?location=${location}`);
  return response.data;
};