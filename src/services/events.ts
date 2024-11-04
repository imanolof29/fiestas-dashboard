import axios from "axios";
import { Event } from "../types/event";

export async function listEvents(): Promise<Event[]> {
    try {
        const response = await axios.get<Event[]>("http://192.168.68.110:3000/events/find")
        return response.data
    } catch (e) {
        throw e
    }
}

export async function deleteEvent(id: string): Promise<void> {
    try {
        const response = await axios.delete(`http://192.168.68.110:3000/events/delete/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}