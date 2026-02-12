import { z } from 'zod'

export const taskSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .min(3, 'Title must be at least 3 characters'),
    description: z
        .string()
        .max(500, 'Description is too long')
        .optional()
        .or(z.literal('')),
    completed: z.boolean(),
})

export type TaskFormValues = z.infer<typeof taskSchema>

export function validateTask(input: unknown) {
    const parsed = taskSchema.safeParse(input)

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
