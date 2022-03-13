import axios from 'axios';

const foundAxios = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export default foundAxios;
