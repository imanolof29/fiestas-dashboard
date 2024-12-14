import axiosInstance from "."

export async function signIn(email: string, password: string) {
    try {
        const response = await axiosInstance.post(`/auth/login`, { email, password })
        return response.data
    } catch (e) {
        throw e
    }
}