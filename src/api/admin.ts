import API from './axios';

// ✅ GET ALL CLUBS
export const getAllClubs = async () => {
  const res = await API.get('/clubs');
  return res.data;
};

// ✅ GET ALL CLUB ADMINS
export const getAllClubAdmins = async () => {
  const res = await API.get('/club-admin');
  return res.data;
};
