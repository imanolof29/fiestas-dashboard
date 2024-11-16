import axios from "axios";
import { CreateEventDto, EventDto } from "../types/event";
import { PaginationDto } from "../types/pagination";
import axiosInstance from ".";

export async function listEvents(page: number, limit: number): Promise<PaginationDto<EventDto>> {
    try {
        const response = await axiosInstance.get<PaginationDto<EventDto>>(`/events/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export const createEvent = async (event: CreateEventDto): Promise<void> => {
    try {
        const response = await axiosInstance.post(`/events/create`, event);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error al crear el evento');
        } else {
            throw new Error('Ocurrió un error desconocido');
        }
    }
};

export async function getEventById(id: string): Promise<EventDto> {
    try {
        const response = await axiosInstance.get<EventDto>(`/events/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function updateEvent(event: EventDto): Promise<void> {
    try {
        await axiosInstance.put(`/events/update/${event.id}`, {
            name: event.name,
            description: event.description,
            price: event.price,
            ticketLimit: event.ticketLimit,
            categoryIds: event.categoryIds
        })
    } catch (e) {
        throw e
    }
}


export async function deleteEvent(id: string): Promise<void> {
    try {
        await axiosInstance.delete(`/events/delete/${id}`)
    } catch (e) {
        console.log(e)
        throw e
    }
}