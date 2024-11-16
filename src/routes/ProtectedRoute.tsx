import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

export const ProtectedRoute = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)

    console.log(accessToken ?? "NO HAY TOKEN")

    if (!accessToken) {
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