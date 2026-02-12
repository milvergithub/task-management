import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address.'),
    password: z.string().min(1, 'Password is required.'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export function validateLogin(input: unknown) {
    const parsed = loginSchema.safeParse(input)
    if (parsed.success) {
        return { success: true as const, data: parsed.data }
    }

    return {
        success: false as const,
        issues: parsed.error.issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message,
            code: i.code,
        })),
    }
}