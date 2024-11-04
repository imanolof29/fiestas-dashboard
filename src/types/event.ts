export interface Event {
    id: string
    name: string
    description: string
    created: Date
    price?: number
    ticketLimit?: number
    ticketSold: number
}