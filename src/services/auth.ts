import axios from "axios"
import { apiUrl } from "."

export async function signIn(email: string, password: string) {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, { email, password })
        return response.data
    } catch (e) {
        throw e
    }
}