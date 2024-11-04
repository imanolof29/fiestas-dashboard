import axios from "axios"

export async function signIn(email: string, password: string) {
    try {
        const response = await axios.post("http://192.168.68.110:3000/auth/login", { email, password })
        return response.data
    } catch (e) {
        throw e
    }
}