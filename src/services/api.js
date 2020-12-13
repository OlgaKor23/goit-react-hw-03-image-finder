import axios from 'axios';

const key = '14443381-410a9df7e91443383d0ce3486';

export const getImages = (query = '', page = 1) => {
  const path = `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(path);
};

export const someFetch = () => {};
