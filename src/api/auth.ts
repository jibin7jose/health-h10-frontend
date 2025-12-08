import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

const API = axios.create({
  baseURL: 'http://192.168.1.13:3000',  // ✅ YOUR BACKEND IP
  headers: { 'Content-Type': 'application/json' },
});

// ✅ AUTO ATTACH TOKEN TO EVERY REQUEST
API.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ UNWRAP BACKEND RESPONSE FORMAT
const unwrap = (res: any) => res.data?.data || res.data;

// ✅ REGISTER
export const registerSuperAdmin = async (payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const res = await API.post('/auth/register', payload);
  return unwrap(res);
};

// ✅ LOGIN
export const loginSuperAdmin = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await API.post('/auth/login', payload);
  return unwrap(res);
};

// ✅ ✅ ✅ FETCH PROFILE FOR NAVBAR
export const fetchProfile = async () => {
  const res = await API.get('/auth/profile');
  return unwrap(res);
};
