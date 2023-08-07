import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:'https://fahrerhub.site',
    headers:{
        "Content-Type":'application/json'
    }
})

export default axiosInstance