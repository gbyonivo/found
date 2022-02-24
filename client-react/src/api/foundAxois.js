import axios from 'axios';

const foundAxios = axios.create({
  baseURL: 'http://localhost:3000',
});

export default foundAxios;
