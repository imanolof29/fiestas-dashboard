import { LucideIcon } from "lucide-react"

const ColumnTypes = {
    TEXT: "text",
    ACTIONS: "actions"
} as const

export type ColumnType = (typeof ColumnTypes)[keyof typeof ColumnTypes]

const PlainColumnTypes = {
    TEXT: "text"
} as const

export type PlainColumnType = (typeof PlainColumnTypes)[keyof typeof PlainColumnTypes]

export interface BaseColumn<T> {
    key: keyof T
    type: ColumnType
}

export interface PlainColumn<T> extends BaseColumn<T> {
    type: PlainColumnType
}

export interface ActionsColumn<T> {
    type: "actions"
    key: "string"
    actions: Actions<T>[]
}

export interface Actions<T> {
    icon: LucideIcon
    onClick: (item: T) => void
}

export type Column<T> = PlainColumn<T> | ActionsColumn<T>