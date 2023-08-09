import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:import.meta.env.vite_SERVERURL,
    headers:{
        "Content-Type":'application/json'
    }
})

export default axiosInstance