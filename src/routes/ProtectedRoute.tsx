import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../providers/AuthProvider"
import Header from "../components/Header"
import { Container } from "react-bootstrap"

export const ProtectedRoute = () => {
    const { token } = useAuth()

    if (!token) {
        return <Navigate to="/signin" />
    }

    return (
        <>
            <Header />
            <Container className="my-4">
                <Outlet />
            </Container>
        </>
    )

}