import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const KEY = "14623087-4c7845c6612c3612d79802be1";
const IMAGES_PER_PAGE = 12;

export const getImages = (query, page) =>
  axios.get(
    BASE_URL +
      `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${IMAGES_PER_PAGE}

`
  );
