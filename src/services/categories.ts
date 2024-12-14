import axios from "axios";
import { CategoryDto, CreateCategoryDto } from "../types/category";
import { PaginationDto } from "../types/pagination";
import axiosInstance from ".";

export async function listCategories(page: number, limit: number): Promise<PaginationDto<CategoryDto>> {
    try {
        const response = await axiosInstance.get<PaginationDto<CategoryDto>>(`/categories/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function createCategory(category: CreateCategoryDto) {
    try {
        const response = await axiosInstance.post(`/categories/create`, category);
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
        const response = await axiosInstance.get<CategoryDto>(`/categories/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export async function updateCategory(category: any): Promise<void> {
    try {
        await axiosInstance.put(`/categories/update/${category.id}`, {
            name: category.name,
        })
    } catch (e) {
        throw e
    }
}

export async function deleteCategory(id: string): Promise<void> {
    try {
        await axiosInstance.delete(`/categories/delete/${id}`)
    } catch (e) {
        throw e
    }
}