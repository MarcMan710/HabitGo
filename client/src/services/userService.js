// services/userService.js

/**
 * Normalizes a username by trimming whitespace and converting to lowercase.
 * @param {string} username - The username to normalize.
 * @returns {string} The normalized username.
 */
import axios from 'axios';

const API_URL = '/api/auth';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data;
};

export const normalizeUsername = (username) => username?.trim().toLowerCase();
