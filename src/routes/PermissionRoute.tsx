import { Outlet } from "react-router-dom"

interface PermissionRouteProps {
    element: JSX.Element
    requiredPermissions: string[],
    resource: string
    permissions: Record<string, string[]>
}

const PermissionRoute = (props: PermissionRouteProps) => {
    const userPermissions = props.permissions[props.resource] || []

    const hasPermission = props.requiredPermissions.some((perm) =>
        userPermissions.includes(perm)
    );

    return hasPermission ? props.element : <Outlet />

}

export default PermissionRoute