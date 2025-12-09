import API from './axios';

export const createClub = async (payload: any) => {
  const res = await API.post('/clubs', payload);
  return res.data;
};
