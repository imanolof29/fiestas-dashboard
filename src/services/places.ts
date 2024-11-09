import axios from "axios";
import { PaginationDto } from "../types/pagination";
import { PlaceDto } from "../types/place";

export async function listPlaces(page: number, limit: number): Promise<PaginationDto<PlaceDto>> {
    try {
        const response = await axios.get<PaginationDto<PlaceDto>>(`http://192.168.68.110:3000/places/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}