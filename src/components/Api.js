import axios from "axios";
import { getToken, logout } from "./Auth";
const baseURL = "http://api77.test/"
const baseURLProd = "https://api77.yellowsistemas.com.br/"
const api = axios.create({
  baseURL: (process.env.NODE_ENV === 'production' ? baseURLProd : baseURL)
});


api.interceptors.request.use(async config => {

  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


api.interceptors.response.use(async response => {

  return response;
}, function (error) {


  return Promise.reject(error.response);
})



export default api;
