import { describe, it, expect } from 'vitest'
import type { AxiosError } from 'axios'

import { retryQuery } from '@/lib/query'

function makeAxiosError(status?: number): AxiosError {
    return {
        isAxiosError: true,
        name: 'AxiosError',
        message: 'Request failed',
        toJSON: () => ({}),
        config: {},
        response: status === undefined ? undefined : ({ status } as any),
    } as unknown as AxiosError
}

describe('retryQuery', () => {
    it('returns true when status is 401 and count is less than 3', () => {
        const err = makeAxiosError(401)

        expect(retryQuery(0, err)).toBe(true)
        expect(retryQuery(1, err)).toBe(true)
        expect(retryQuery(2, err)).toBe(true)
    })

    it('returns false when status is 401 and count is 3 or more', () => {
        const err = makeAxiosError(401)

        expect(retryQuery(3, err)).toBe(false)
        expect(retryQuery(4, err)).toBe(false)
    })

    it('returns false for non-401 statuses regardless of count', () => {
        expect(retryQuery(0, makeAxiosError(400))).toBe(false)
        expect(retryQuery(2, makeAxiosError(403))).toBe(false)
        expect(retryQuery(0, makeAxiosError(500))).toBe(false)
        expect(retryQuery(2, makeAxiosError(200))).toBe(false)
    })

    it('returns false when error.response is missing', () => {
        const err = makeAxiosError(undefined)
        expect(retryQuery(0, err)).toBe(false)
        expect(retryQuery(2, err)).toBe(false)
    })

    it('returns false when status is missing on response', () => {
        const err = {
            isAxiosError: true,
            response: {},
        } as unknown as AxiosError

        expect(retryQuery(0, err)).toBe(false)
    })
})