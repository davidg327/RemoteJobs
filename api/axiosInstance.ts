import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://remotive.com/api/',
    timeout: 20000,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {

                case 400:
                    throw 'Solicitud incorrecta';
                case 404:
                    throw 'No encontrado';
                case 500:
                    throw 'Error del servidor';
                default:
                    throw 'Error desconocido';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
