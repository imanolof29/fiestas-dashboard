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
import { CreateUser } from "../pages/users/create/CreateUser"
import { UpdateUser } from "../pages/users/update/UpdateUser"
import Dashboard from "../pages/dashboard/Dashboard"
import Profile from "../pages/profile/Profile"
import ListPlaces from "../pages/places/list/ListPlaces"
import ImportPlaces from "../pages/places/import/ImportPlaces"
import UpdatePlace from "../pages/places/update/UpdatePlace"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import PermissionRoute from "./PermissionRoute"

const Routes = () => {

    const { permissions } = useSelector((state: RootState) => state.auth);

    const adminRoutes = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "",
                    element: <Dashboard />
                },
                {
                    path: "/events",
                    element: (
                        <PermissionRoute
                            element={<ListEvents />}
                            requiredPermissions={["list"]}
                            resource="events"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/events/:id",
                    element: (
                        <PermissionRoute
                            element={<UpdateEvent />}
                            requiredPermissions={["edit"]}
                            resource="events"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/events/create",
                    element: (
                        <PermissionRoute
                            element={<CreateEvent />}
                            requiredPermissions={["add"]}
                            resource="events"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/categories",
                    element: (
                        <PermissionRoute
                            element={<ListCategories />}
                            requiredPermissions={["list"]}
                            resource="categories"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/categories/:id",
                    element: (
                        <PermissionRoute
                            element={<UpdateCategory />}
                            requiredPermissions={["edit"]}
                            resource="categories"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/categories/create",
                    element: (
                        <PermissionRoute
                            element={<CreateCategory />}
                            requiredPermissions={["add"]}
                            resource="categories"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/users",
                    element: (
                        <PermissionRoute
                            element={<ListUsers />}
                            requiredPermissions={["list"]}
                            resource="users"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/users/create",
                    element: (
                        <PermissionRoute
                            element={<CreateUser />}
                            requiredPermissions={["add"]}
                            resource="users"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/users/:id",
                    element: (
                        <PermissionRoute
                            element={<UpdateUser />}
                            requiredPermissions={["edit"]}
                            resource="users"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/places",
                    element: (
                        <PermissionRoute
                            element={<ListPlaces />}
                            requiredPermissions={["list"]}
                            resource="places"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/places/import",
                    element: (
                        <PermissionRoute
                            element={<ImportPlaces />}
                            requiredPermissions={["add"]}
                            resource="places"
                            permissions={permissions}
                        />
                    )
                },
                {
                    path: "/places/:id",
                    element: (
                        <PermissionRoute
                            element={<UpdatePlace />}
                            requiredPermissions={["edit"]}
                            resource="places"
                            permissions={permissions}
                        />
                    )
                }
            ]
        }
    ];

    const authRoutes = [
        {
            path: "/signin",
            element: <SignIn />
        }
    ];

    const router = createBrowserRouter([
        ...adminRoutes,
        ...authRoutes
    ]);

    return <RouterProvider router={router} />;

}

export default Routes