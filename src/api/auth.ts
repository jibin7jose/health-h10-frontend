import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.11:3000',
  headers: { 'Content-Type': 'application/json' },
});

// Extract "data" wrapper (your backend format)
const unwrap = (res: any) => res.data?.data || res.data;

// REGISTER
export const registerSuperAdmin = async (payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const res = await API.post('/auth/register', payload);
  return unwrap(res); // FIXED
};

// LOGIN
export const loginSuperAdmin = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await API.post('/auth/login', payload);
  return unwrap(res); // FIXED
};
