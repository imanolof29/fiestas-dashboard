import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "../pages/auth/signin/SignIn"
import { ProtectedRoute } from "./ProtectedRoute"
import { ListEvents } from "../pages/events/list/ListEvents"

const Routes = () => {

    const adminRoutes = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <ListEvents />
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