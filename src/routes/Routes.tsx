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
import { ListOrganizations } from "../pages/organizations/list/ListOrganizations"
import { CreateOrganization } from "../pages/organizations/create/CreateOrganization"
import { UpdateOrganization } from "../pages/organizations/update/UpdateOrganization"
import { PurchaseEventTicket } from "../pages/events/purchase/PurchaseEventTicket"

const Routes = () => {

    //const { permissions } = useSelector((state: RootState) => state.auth);

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
                    element: <ListEvents />
                },
                {
                    path: "/events/:id",
                    element: <UpdateEvent />
                },
                {
                    path: "/events/:id/purchase",
                    element: <PurchaseEventTicket />
                },
                {
                    path: "/events/create",
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
                },
                {
                    path: "/users/create",
                    element: <CreateUser />
                },
                {
                    path: "/users/:id",
                    element: <UpdateUser />
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/places",
                    element: <ListPlaces />
                },
                {
                    path: "/places/import",
                    element: <ImportPlaces />
                },
                {
                    path: "/places/:id",
                    element: <UpdatePlace />
                },
                {
                    path: "/organizations",
                    element: <ListOrganizations />
                },
                {
                    path: "/organizations/create",
                    element: <CreateOrganization />
                },
                {
                    path: "/organizations/:id",
                    element: <UpdateOrganization />
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