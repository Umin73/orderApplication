import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // baseURL은 빈 루트로 설정
    withCredentials: true
});

axiosInstance.interceptors.request.use(
    async config => {
        let accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 응답 인터셉터 (여기서 토큰 재발급 처리)
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // access token 만료 에러가 발생했을 때
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 무한루프 방지

            try {
                // Refresh Token으로 Access Token 재발급 요청
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('/user/reissue', { refreshToken: refreshToken });

                const newAccessToken = response.data.accessToken;

                // 새로 받은 access token 저장
                localStorage.setItem('accessToken', newAccessToken);

                // 새 access token으로 원래 요청 다시 시도
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                console.error('리프레시 토큰 만료 또는 오류:', refreshError);
                alert('로그인이 만료되었습니다. 다시 로그인 해주세요.');
                // 토큰 삭제 및 로그인 페이지로 이동 등 처리
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;