export interface OrganizationDto {
    id: string;
    name: string;
    logo?: string
    userId: string;
    placeId: string;
    created: Date;
}

export interface CreateOrganizationDto {
    name: string
    userId: string
}