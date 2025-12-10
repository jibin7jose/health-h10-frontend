// src/api/auth.ts
import api from './axios';

const unwrap = (res: any) => res.data?.data || res.data;

// ✅ REGISTER SUPER ADMIN
export const registerSuperAdmin = async (payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
}) => {
  const res = await api.post('/auth/register', payload);
  return unwrap(res);
};

// ✅ LOGIN (SUPER_ADMIN / CLUB_ADMIN / COACH)
export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const res = await api.post('/auth/login', payload);
  return unwrap(res);
};

// ✅ PROFILE
export const fetchProfile = async () => {
  const res = await api.get('/auth/profile');
  return unwrap(res);
};

// ✅ FORGOT PASSWORD
export const forgotPassword = async (email: string) => {
  const res = await api.post('/auth/forgot-password', { email });
  return unwrap(res);
};

// ✅ RESET PASSWORD
export const resetPassword = async (payload: {
  token: string;
  password: string;
}) => {
  const res = await api.post('/auth/reset-password', payload);
  return unwrap(res);
};
