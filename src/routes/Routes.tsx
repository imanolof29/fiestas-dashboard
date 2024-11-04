import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "../pages/auth/signin/SignIn"
import { ProtectedRoute } from "./ProtectedRoute"

const Routes = () => {

    const adminRoutes = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <p>Home</p>
                }
            ]
        }
    ]
    const authRoutes = [
        {
            path: "/signin",
            element: <SignIn />
        }
    ]

    const router = createBrowserRouter([
        ...adminRoutes,
        ...authRoutes
    ])

    return <RouterProvider router={router} />

}

export default Routes