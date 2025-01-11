import { DataTable } from "@/components/datatable/datatable";
import { useCategoryList } from "@/hooks/api/categories.hook";

export const ListCategories = () => {

    const { data } = useCategoryList()

    return (
        <div className="container mx-auto py-10">
            {data?.data && (
                <DataTable
                    title={"Categorias"}
                    subtitle={"Listado de categorias"}
                    columns={[
                        {
                            accessorKey: "name",
                            header: "Nombre",
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