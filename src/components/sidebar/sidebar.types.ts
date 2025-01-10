import { LucideIcon } from "lucide-react"

export interface SidebarLink {
    name: string
    icon: LucideIcon
    href: string
}

export interface SidebarProperties {
    links: SidebarLink[]
}