import axios from "axios"
import axiosInstance from "."
import { CreateOrganizationDto, OrganizationDto } from "../types/organization"
import { PaginationDto } from "../types/pagination"

export async function listOrganizations(page: number, limit: number): Promise<PaginationDto<OrganizationDto>> {
    try {
        const response = await axiosInstance.get<PaginationDto<OrganizationDto>>(`/organizations/find?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export const createOrganization = async (organization: CreateOrganizationDto): Promise<void> => {
    try {
        await axiosInstance.post(`/organizations/create`, organization);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error al crear la organización');
        } else {
            throw new Error('Ocurrió un error desconocido');
        }
    }
};

export const getOrganizationById = async (id: string): Promise<OrganizationDto> => {
    try {
        const response = await axiosInstance.get<OrganizationDto>(`/organizations/pick/${id}`)
        return response.data
    } catch (e) {
        throw e
    }
}

export const updateOrganization = async (organization: OrganizationDto): Promise<void> => {
    try {
        await axiosInstance.put(`/organizations/update/${organization.id}`, {
            name: organization.name,
            userId: organization.userId,
            placeId: organization.placeId
        })
    } catch (e) {
        throw e
    }
}

export async function deleteOrganization(id: string): Promise<void> {
    try {
        await axiosInstance.delete(`/organizations/delete/${id}`)
    } catch (e) {
        console.log(e)
        throw e
    }
}