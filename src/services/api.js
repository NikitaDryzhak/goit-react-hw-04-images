import axios from 'axios';

const API_KEY = '26913432-f00ec335ce5fc82565c3f9d16';
const BASE_URL = `https://pixabay.com/api/`;
const settings = `image_type=photo&orientation=horizontal&per_page=12`;

export const getPictures = (page, pictureName) =>
  axios.get(
    `${BASE_URL}?q=${pictureName}&page=${page}&key=${API_KEY}&${settings}`
  );
