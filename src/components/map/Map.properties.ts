import { CSSProperties } from "react"

export interface LatLng {
    latitude: number
    longitude: number
}

export interface MapProperties {
    coordinates: LatLng[]
    style?: CSSProperties
}