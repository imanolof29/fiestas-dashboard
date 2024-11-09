import { Position } from "./position"

export interface PlaceDto {
    id: string
    name: string
    description?: string
    position: Position
    city?: string
    street?: string
    postcode?: string
    housenumber?: string
    website?: string
    facebook?: string
    phone?: string
    osmId: string
}