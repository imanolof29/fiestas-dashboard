import { listPlaces } from "@/services/places"
import { PaginationDto } from "@/types/pagination"
import { PlaceDto } from "@/types/place"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const usePlacesList = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    const query = useQuery<PaginationDto<PlaceDto>>({
        queryKey: ["places", page, limit],
        queryFn: () => listPlaces(page, limit),
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