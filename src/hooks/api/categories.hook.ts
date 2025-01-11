import { listCategories } from "@/services/categories"
import { CategoryDto } from "@/types/category"
import { PaginationDto } from "@/types/pagination"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const useCategoryList = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    const query = useQuery<PaginationDto<CategoryDto>>({
        queryKey: ["categories", page, limit],
        queryFn: () => listCategories(page, limit),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })

    return {
        ...query,
        page,
        limit,
        setPage,
        setLimit
    }

}