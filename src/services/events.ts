import axios from "axios";
import { CreateEventDto, EventDto } from "../types/event";
import { PaginationDto } from "../types/pagination";
import { apiUrl } from ".";

export async function listEvents(page: number, limit: number): Promise<PaginationDto<EventDto>> {
    try {
        const response = await axios.get<PaginationDto<EventDto>>(`http://192.168.68.107:3000/events/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export const createEvent = async (event: CreateEventDto): Promise<void> => {
    try {
        const response = await axios.post(`${apiUrl}/events/create`, event);
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
        const response = await axios.get<EventDto>(`${apiUrl}/events/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function updateEvent(event: EventDto): Promise<void> {
    try {
        await axios.put(`${apiUrl}/events/update/${event.id}`, {
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
        await axios.delete(`${apiUrl}/events/delete/${id}`)
    } catch (e) {
        console.log(e)
        throw e
    }
}