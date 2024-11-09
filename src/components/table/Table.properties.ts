import { ReactNode } from "react";
import { PaginationDto } from "../../types/pagination";

export interface TableProperties<T> {
    columns: string[];
    renderRow: (item: T) => ReactNode
    fetchData: (page: number, limit: number) => Promise<PaginationDto<T>>;
    pageSize?: number
}
