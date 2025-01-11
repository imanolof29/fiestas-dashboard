import { DataTable } from "@/components/datatable/datatable"
import { usePlacesList } from "@/hooks/api/places.hook"

const ListPlaces = () => {

    const { data } = usePlacesList()

    return (
        <div className="container mx-auto py-10">
            {data?.data && (
                <DataTable
                    title={"Ubicaciones"}
                    subtitle={"Listado de ubicaciones"}
                    columns={[
                        {
                            accessorKey: "name",
                            header: "Nombre",
                        },
                        {
                            accessorKey: "city",
                            header: "Ciudad"
                        },
                    ]}
                    data={data.data}
                />
            )}
        </div>
    )

}

export default ListPlaces