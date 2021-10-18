import axios from 'axios';
import { LOCAL_STORAGE_TOKEN } from '../helpers/localStorage';

const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.defaults.headers.authorization = `Bearer ${token}`;
api.defaults.headers['Content-Type'] = 'application/json';
api.defaults.headers['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Access-Control-Allow-Credentials'] = true;

export default api;
