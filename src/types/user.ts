export interface UserDto {
    id: string
    firstName: string
    lastName: string
    username: string
    email: string
    created: Date
}

export interface CreateUserDto {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}