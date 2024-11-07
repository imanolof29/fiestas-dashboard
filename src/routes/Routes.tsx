import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignIn } from "../pages/auth/signin/SignIn"
import { ProtectedRoute } from "./ProtectedRoute"
import { ListEvents } from "../pages/events/list/ListEvents"
import { UpdateEvent } from "../pages/events/update/UpdateEvent"
import { CreateEvent } from "../pages/events/create/CreateEvent"
import { ListCategories } from "../pages/categories/list/ListCategories"
import { UpdateCategory } from "../pages/categories/update/UpdateCategory"
import { CreateCategory } from "../pages/categories/create/CreateCategory"
import { ListUsers } from "../pages/users/list/ListUsers"

const Routes = () => {

    const adminRoutes = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <ListEvents />
                },
                {
                    path: "/:id",
                    element: <UpdateEvent />
                },
                {
                    path: "/create",
                    element: <CreateEvent />
                },
                {
                    path: "/categories",
                    element: <ListCategories />
                },
                {
                    path: "/categories/:id",
                    element: <UpdateCategory />
                },
                {
                    path: "/categories/create",
                    element: <CreateCategory />
                },
                {
                    path: "/users",
                    element: <ListUsers />
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