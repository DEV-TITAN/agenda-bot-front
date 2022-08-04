import axios from 'axios';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '../helpers/localStorage';

const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);

const api = axios.create({
  baseURL: `https://agendabot-api.titanci.com.br/v1/`,
});

api.defaults.headers.authorization = `Bearer ${token}`;
api.defaults.headers['Content-Type'] = 'application/json';
api.defaults.headers['Access-Control-Allow-Origin'] = '*';
api.defaults.headers['Access-Control-Allow-Credentials'] = true;

export default api;
