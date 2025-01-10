import { ColumnDef } from "@tanstack/react-table"

export interface DataTableProps<TData, TValue> {
    title: string
    subtitle: string
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onCreate?: VoidFunction
}