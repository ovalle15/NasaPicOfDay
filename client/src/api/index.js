import https from 'https';
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    hostname: 'http://localhost:3000/',
    httpsAgent: https.Agent({
        rejectUnauthorized: false,
    }),
});

export const getImage = payload =>api.get(`/nasaimage`, payload);

export const getUser = id => api.get(`/user/${id}`);

export const userInsert = payload => api.post(`/user`, payload);

export const userUpdate = (id, payload) => api.put(`/user/${id}`, payload);

export const userDelete = id => api.delete(`/user/${id}`);



const apis = {
    getImage,
    getUser,
    userInsert,
    userUpdate,
    userDelete
}

export default apis;