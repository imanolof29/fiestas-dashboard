import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/header/Header"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import Sidebar from "@/components/sidebar/sidebar"
import { SidebarLink } from "@/components/sidebar/sidebar.types"
import { House, ListCheck, MapPin, PartyPopperIcon, User } from "lucide-react"

export const links: SidebarLink[] = [
    {
        name: "Eventos",
        icon: PartyPopperIcon,
        href: "events"
    },
    {
        name: "Categorias",
        icon: ListCheck,
        href: "categories",
    },
    {
        name: "Ubicaciones",
        icon: MapPin,
        href: "places"
    },
    {
        name: "Organizaciones",
        icon: House,
        href: "organizations"
    },
    {
        name: "Usuarios",
        icon: User,
        href: "users"
    }
]

export const ProtectedRoute = () => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken)

    if (!accessToken) {
        return <Navigate to="/signin" />
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <Sidebar links={links} />
            </div>
            <div className="flex flex-col">
                <Header />
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )

}