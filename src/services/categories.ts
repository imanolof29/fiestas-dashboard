import axios from "axios";
import { CategoryDto, CreateCategoryDto } from "../types/category";
import { PaginationDto } from "../types/pagination";
import { apiUrl } from ".";

export async function listCategories(page: number, limit: number): Promise<PaginationDto<CategoryDto>> {
    try {
        const response = await axios.get<PaginationDto<CategoryDto>>(`http://192.168.68.107:3000/categories/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function createCategory(category: CreateCategoryDto) {
    try {
        const response = await axios.post(`${apiUrl}/categories/create`, category);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error al crear el evento');
        } else {
            throw new Error('Ocurrió un error desconocido');
        }
    }
}

export async function getCategoryById(id: string): Promise<CategoryDto> {
    try {
        const response = await axios.get<CategoryDto>(`${apiUrl}/categories/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function updateCategory(category: any): Promise<void> {
    try {
        await axios.put(`${apiUrl}/categories/update/${category.id}`, {
            name: category.name,
        })
    } catch (e) {
        throw e
    }
}

export async function deleteCategory(id: string): Promise<void> {
    try {
        await axios.delete(`${apiUrl}/categories/delete/${id}`)
    } catch (e) {
        throw e
    }
}