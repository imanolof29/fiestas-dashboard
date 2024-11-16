import axiosInstance, { apiUrl } from "."

export async function signIn(email: string, password: string) {
    try {
        const response = await axiosInstance.post(`${apiUrl}/auth/login`, { email, password })
        return response.data
    } catch (e) {
        throw e
    }
}