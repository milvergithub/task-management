import { type LoginFormValues, loginSchema, validateLogin } from '@/pages/auth/loginSchema.ts';
import { describe, it, expect } from 'vitest'

describe('loginSchema', () => {
    it('accepts a valid email + non-empty password', () => {
        const input: LoginFormValues = { email: 'user@example.com', password: 'secret' }
        const res = loginSchema.safeParse(input)

        expect(res.success).toBe(true)
        if (res.success) {
            expect(res.data).toEqual(input)
        }
    })

    it('rejects an invalid email', () => {
        const res = loginSchema.safeParse({ email: 'not-an-email', password: 'secret' })

        expect(res.success).toBe(false)
        if (!res.success) {
            expect(res.error.issues.some((i) => i.path[0] === 'email')).toBe(true)
            expect(res.error.issues.find((i) => i.path[0] === 'email')?.message).toBe(
                'Please enter a valid email address.',
            )
        }
    })

    it('rejects missing email (required)', () => {
        const res = loginSchema.safeParse({ password: 'secret' })

        expect(res.success).toBe(false)
        if (!res.success) {
            expect(res.error.issues.some((i) => i.path[0] === 'email')).toBe(true)
        }
    })

    it('rejects empty password with correct message', () => {
        const res = loginSchema.safeParse({ email: 'user@example.com', password: '' })

        expect(res.success).toBe(false)
        if (!res.success) {
            const issue = res.error.issues.find((i) => i.path[0] === 'password')
            expect(issue?.message).toBe('Password is required.')
        }
    })

    it('validateLogin helper returns normalized issues', () => {
        const out = validateLogin({ email: 'bad', password: '' })

        expect(out.success).toBe(false)
        if (!out.success) {
            const paths = out.issues.map((i) => i.path).sort()
            expect(paths).toEqual(['email', 'password'])
            expect(out.issues.find((i) => i.path === 'email')?.message).toBe(
                'Please enter a valid email address.',
            )
            expect(out.issues.find((i) => i.path === 'password')?.message).toBe(
                'Password is required.',
            )
        }
    })
})