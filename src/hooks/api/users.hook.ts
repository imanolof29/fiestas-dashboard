import { listUsers } from "@/services/users"
import { PaginationDto } from "@/types/pagination"
import { UserDto } from "@/types/user"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const useUserList = () => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    const query = useQuery<PaginationDto<UserDto>>({
        queryKey: ["users", page, limit],
        queryFn: () => listUsers(page, limit),
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