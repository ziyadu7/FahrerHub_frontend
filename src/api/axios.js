import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://fahrerhub.onrender.com',
    headers:{
        "Content-Type":'application/json'
    }
})

export default axiosInstance