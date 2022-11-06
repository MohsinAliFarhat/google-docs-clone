import axios from 'axios';
const BASE_URL = `http://localhost:3000`;

axios.interceptors.request.use(config => {

    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;

}, function (error) {
    return Promise.reject(error);
});

const sendPostRequest = (url, body) => {
    return axios.post(`${BASE_URL}/${url}`, body);
}

const sendPutRequest = (url, body) => {
    return axios.put(`${BASE_URL}/${url}`, body)
}

const sendGetRequest = (url) => {
    return axios.get(`${BASE_URL}/${url}`);
}

const sendDeleteRequest = (url) => {
    return axios.delete(`${BASE_URL}/${url}`)
}

export { sendPostRequest, sendPutRequest, sendGetRequest, sendDeleteRequest };