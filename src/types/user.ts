export interface UserDto {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    created: Date
    role: UserRole
}

export interface CreateUserDto {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    role: UserRole
}

export type UserRole = 'USER' | 'ORGANIZER' | 'ADMIN'