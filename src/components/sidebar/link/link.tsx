import { Link } from "react-router-dom";
import { SidebarLink } from "../sidebar.types";

export default function SidebarLinkComponent({ href, icon: Icon, name }: SidebarLink) {
    return (
        <Link to={href} key={name} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer">
            <Icon className="h-4 w-4" />
            {name}
        </Link>
    );
}