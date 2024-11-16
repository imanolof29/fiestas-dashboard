import axios from "axios";
import { PaginationDto } from "../types/pagination";
import { PlaceDto } from "../types/place";
import { apiUrl } from ".";

export async function listPlaces(page: number, limit: number): Promise<PaginationDto<PlaceDto>> {
    try {
        const response = await axios.get<PaginationDto<PlaceDto>>(`${apiUrl}/places/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function getPlaceById(id: string): Promise<PlaceDto> {
    try {
        const response = await axios.get<PlaceDto>(`${apiUrl}/places/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function deleteAllData() {
    try {
        await axios.delete(`${apiUrl}/places/delete-data`)
    } catch (e) {
        throw e
    }
}

export async function importJson(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    try {
        await axios.post(`${apiUrl}/places/import-data`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (e) {
        throw e
    }
}