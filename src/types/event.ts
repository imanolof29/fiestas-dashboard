export interface EventDto {
    id: string
    name: string
    description: string
    created: Date
    price?: number
    ticketLimit?: number
    ticketSold: number
    categoryIds: string[]
}

export interface CreateEventDto {
    name: string
    description: string
    price?: number
    ticketLimit?: number
    latitude: number
    longitude: number
    categoryIds: string[]
}