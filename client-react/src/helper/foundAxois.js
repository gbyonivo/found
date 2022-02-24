import axios from 'axios';

const foundAxios = axios.create({
  baseURL: 'localhost:3000',
});

export default foundAxios;
