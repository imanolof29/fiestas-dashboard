import { PaginationDto } from "../types/pagination";
import { PlaceDto } from "../types/place";
import axiosInstance from ".";

export async function listPlaces(page: number, limit: number): Promise<PaginationDto<PlaceDto>> {
    try {
        const response = await axiosInstance.get<PaginationDto<PlaceDto>>(`/places/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function getPlaceById(id: string): Promise<PlaceDto> {
    try {
        const response = await axiosInstance.get<PlaceDto>(`/places/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function deleteAllData() {
    try {
        await axiosInstance.delete(`/places/delete-data`)
    } catch (e) {
        throw e
    }
}

export async function importJson(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    try {
        await axiosInstance.post(`/places/import-data`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (e) {
        throw e
    }
}