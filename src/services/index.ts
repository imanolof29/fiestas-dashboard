import axios from "axios"
import { store } from "../redux/store"

export const apiUrl = "http://192.168.1.131:3000"

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 1000
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance