import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_SERVERURL,
    headers:{
        "Content-Type":'application/json'
    }
})

// axiosInstance.defaults.timeout = 10000
export default axiosInstance