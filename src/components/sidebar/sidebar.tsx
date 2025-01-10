import { Button } from "@/components/ui/button";
import { Bell, Package2 } from "lucide-react";
import { SidebarProperties } from "./sidebar.types";
import { Link } from "react-router-dom";
import SidebarLinkComponent from "./link/link";

export default function Sidebar(properties: SidebarProperties) {
    return (
        <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link to={""} className="flex items-center gap-2 font-semibold">
                    <Package2 className="h-6 w-6" />
                    <span className="">Acme Inc</span>
                </Link>
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
            </div>
            <div className="flex-1">
                <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    {properties.links.map((link) => <SidebarLinkComponent href={link.href} name={link.name} icon={link.icon} />)}
                </nav>
            </div>
        </div>
    )
}