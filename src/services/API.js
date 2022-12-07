import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://192.168.17.192:5000',
});

export default Api;