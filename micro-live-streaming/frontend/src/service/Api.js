import Axios from 'axios';

export const base = Axios.create({
  baseURL: `${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/api`,
  headers: {
    "Content-Type": "application/json"
  }
})

export const getLive = async (liveSlug) => {
  const { data } = await base.get(`/lives/${liveSlug}`);
  return data;
}
