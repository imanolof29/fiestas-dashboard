
export interface EventDto {
    id: string;
    name: string;
    description: string;
    created: Date;
    price?: number;
    ticketLimit?: number;
    ticketsSold: number;
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