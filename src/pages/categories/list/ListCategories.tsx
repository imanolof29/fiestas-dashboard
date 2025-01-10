import { useEffect, useState } from "react";
import { CategoryDto } from "../../../types/category";
import { listCategories } from "../../../services/categories";
import { DataTable } from "@/components/datatable/datatable";

export const ListCategories = () => {

    const [categories, setCategories] = useState<CategoryDto[]>([]);


    const getCategories = async (page: number, limit: number) => {
        try {
            const response = await listCategories(page, limit)
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        getCategories(1, 10);
    }, []);


    return (
        <div className="container mx-auto py-10">
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
                data={categories}
            />
        </div>
    )
}