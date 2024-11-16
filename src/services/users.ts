import { CreateUserDto, UserDto } from "../types/user";
import { PaginationDto } from "../types/pagination";
import axiosInstance from ".";

export async function listUsers(page: number, limit: number): Promise<PaginationDto<UserDto>> {
    try {
        const response = await axiosInstance.get<PaginationDto<UserDto>>(`/users/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function getUserById(id: string): Promise<UserDto> {
    try {
        const response = await axiosInstance.get<UserDto>(`/users/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function updateUser(user: UserDto): Promise<void> {
    try {
        await axiosInstance.put(`/users/update/${user.id}`, {
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
        await axiosInstance.post<CreateUserDto>(`/users/create`, user)
    } catch (e) {
        throw e
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        await axiosInstance.delete(`/users/delete/${id}`)
    } catch (e) {
        throw e
    }
}

export async function uploadProfileImage(file: File): Promise<void> {
    const formData = new FormData()
    formData.append('file', file)
    try {
        await axiosInstance.post('/users/profile-picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } catch (e) {
        throw e
    }
}