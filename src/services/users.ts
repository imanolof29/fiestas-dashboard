import axios from "axios";
import { CreateUserDto, UserDto } from "../types/user";
import { PaginationDto } from "../types/pagination";
import { apiUrl } from ".";

export async function listUsers(page: number, limit: number): Promise<PaginationDto<UserDto>> {
    try {
        const response = await axios.get<PaginationDto<UserDto>>(`${apiUrl}/users/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function getUserById(id: string): Promise<UserDto> {
    try {
        const response = await axios.get<UserDto>(`${apiUrl}/users/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function updateUser(user: UserDto): Promise<void> {
    try {
        await axios.put(`${apiUrl}/users/update/${user.id}`, {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
        })
    } catch (e) {
        throw e
    }
}

export async function createUser(user: CreateUserDto): Promise<void> {
    try {
        await axios.post<CreateUserDto>(`${apiUrl}/users/create`, user)
    } catch (e) {
        throw e
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        await axios.delete(`http://192.168.68.107:3000/users/delete/${id}`)
    } catch (e) {
        throw e
    }
}

export async function uploadProfileImage(file: File): Promise<void> {
    const formData = new FormData()
    formData.append('file', file)
    try {
        await axios.post('http://192.168.68.107:3000/users/profile-picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (e) {
        throw e
    }
}