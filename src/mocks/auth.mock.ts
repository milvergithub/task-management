// auth.mock.ts
export interface MockUser {
    email: string
    password: string
    token: string
}

export const mockUsers: MockUser[] = [
    {
        email: 'admin@example.com',
        password: 'admin123',
        token: 'jwt-admin-token',
    },
    {
        email: 'user@example.com',
        password: 'user123',
        token: 'jwt-user-token',
    },
]
