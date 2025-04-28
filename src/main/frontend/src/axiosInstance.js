import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/', // baseURL은 빈 루트로 설정
    withCredentials: true
});

export default axiosInstance;