import axios from 'axios';

export const siteAPI = "http://localhost:3000"

export const serverAPI = axios.create({
    baseURL: siteAPI
});