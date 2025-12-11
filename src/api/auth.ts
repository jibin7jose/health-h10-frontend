import api from './axios';

// UNWRAP CORRECT LEVEL: res.data.data
const unwrap = (res: any) => res.data?.data || res.data;

// REGISTER SUPER ADMIN
export const registerSuperAdmin = async (payload) => {
  const res = await api.post('/auth/register', payload);
  return unwrap(res);
};

// LOGIN
export const loginUser = async (payload) => {
  const res = await api.post('/auth/login', payload);
  return unwrap(res); // returns { needOtp, email, message }
};

// VERIFY OTP
export const verifyLoginOtp = async (payload) => {
  const res = await api.post('/auth/verify-login-otp', payload);
  return unwrap(res);
};

// PROFILE
export const fetchProfile = async () => {
  const res = await api.get('/auth/profile');
  return unwrap(res);
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  const res = await api.post('/auth/forgot-password', { email });
  return unwrap(res);
};

// RESET PASSWORD
export const resetPassword = async (payload) => {
  const res = await api.post('/auth/reset-password', payload);
  return unwrap(res);
};
