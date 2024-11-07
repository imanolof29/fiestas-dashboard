import axios from "axios";
import { CreateUserDto, UserDto } from "../types/user";

export async function listUsers(): Promise<UserDto[]> {
    try {
        const response = await axios.get<UserDto[]>("http://192.168.68.110:3000/users/find")
        return response.data
    } catch (e) {
        throw e
    }
}

export async function getUserById(id: string): Promise<UserDto> {
    try {
        const response = await axios.get<UserDto>(`http://192.168.68.110:3000/users/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function updateUser(user: UserDto): Promise<void> {
    try {
        await axios.put(`http://192.168.68.110:3000/users/update/${user.id}`, {
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
        await axios.post<CreateUserDto>('http://192.168.68.110:3000/users/create', user)
    } catch (e) {
        throw e
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        await axios.delete(`http://192.168.68.110:3000/users/delete/${id}`)
    } catch (e) {
        throw e
    }
}