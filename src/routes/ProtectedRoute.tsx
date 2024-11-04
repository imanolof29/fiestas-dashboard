import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"

export const ProtectedRoute = () => {
    const { token } = useAuth()

    console.log(token)

    if (!token) {
        return <Navigate to="/signin" />
    }

    return <Outlet />

}