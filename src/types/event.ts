export interface Position {
    type: string;
    coordinates: number[];
}

export interface EventDto {
    id: string;
    name: string;
    description: string;
    created: Date;
    price?: number;
    ticketLimit?: number;
    ticketsSold: number;
    categoryIds: string[];
    position: Position;
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