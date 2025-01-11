import { DataTable } from "@/components/datatable/datatable"
import { useUserList } from "@/hooks/api/users.hook"

export const ListUsers = () => {

    const { data } = useUserList()

    return (
        <div className="container mx-auto py-10">
            {data?.data && (
                <DataTable
                    title={"Usuarios"}
                    subtitle={"Listado de usuarios"}
                    columns={[
                        {
                            accessorKey: "firstName",
                            header: "Nombre",
                        },
                        {
                            accessorKey: "lastName",
                            header: "Apellido"
                        },
                        {
                            accessorKey: "email",
                            header: "Email"
                        },
                        {
                            accessorKey: "username",
                            header: "Nombre de usuario"
                        },
                        {
                            accessorKey: "created",
                            header: "Fecha de creacion"
                        }
                    ]}
                    data={data.data}
                />
            )}
        </div>
    )
}