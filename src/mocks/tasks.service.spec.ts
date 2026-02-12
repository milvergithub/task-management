import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Task } from '@/interfaces/types/task'

/**
 * Uses fake timers to skip internal delay().
 * Important: attach `.rejects` / `.resolves` expectations BEFORE advancing timers
 * to avoid unhandled rejections.
 */

describe('tasksApi', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        vi.spyOn(console, 'log').mockImplementation(() => {})
        vi.resetModules()
    })

    afterEach(() => {
        vi.useRealTimers()
        vi.unstubAllGlobals()
        vi.restoreAllMocks()
    })

    async function loadFresh() {
        const mod = await import('@/mocks/tasks.service.ts')
        return mod.tasksApi
    }

    const runDelay = async () => {
        await vi.advanceTimersByTimeAsync(500)
    }

    describe('getAll', () => {
        it('returns first page with defaults and correct metadata', async () => {
            const tasksApi = await loadFresh()

            const promise = tasksApi.getAll()
            await runDelay()
            const res = await promise

            expect(res.page).toBe(1)
            expect(res.pageSize).toBe(12)
            expect(res.total).toBe(25)
            expect(res.totalPages).toBe(3)
            expect(res.data).toHaveLength(12)
            expect(res.data[0]?.id).toBe('1')
        })

        it('paginates correctly with pageSize=2', async () => {
            const tasksApi = await loadFresh()

            const p1Promise = tasksApi.getAll(1, 2)
            await runDelay()
            const p1 = await p1Promise
            expect(p1.total).toBe(25)
            expect(p1.totalPages).toBe(13)
            expect(p1.data.map(t => t.id)).toEqual(['1', '2'])

            const p2Promise = tasksApi.getAll(2, 2)
            await runDelay()
            const p2 = await p2Promise
            expect(p2.data.map(t => t.id)).toEqual(['3', '4'])

            const p3Promise = tasksApi.getAll(3, 2)
            await runDelay()
            const p3 = await p3Promise
            expect(p3.data.map(t => t.id)).toEqual(['5', '6'])
        })

        it('returns empty data for a page beyond the end', async () => {
            const tasksApi = await loadFresh()

            const promise = tasksApi.getAll(10, 12)
            await runDelay()
            const res = await promise

            expect(res.data).toEqual([])
            expect(res.total).toBe(25)
            expect(res.totalPages).toBe(3)
            expect(res.page).toBe(10)
            expect(res.pageSize).toBe(12)
        })
    })

    describe('getById', () => {
        it('throws "Task not found" when the id does not exist (no unhandled rejection)', async () => {
            const tasksApi = await loadFresh()

            const promise = tasksApi.getById('does-not-exist')

            // Attach handler first, then advance timers to trigger rejection.
            const assertion = expect(promise).rejects.toThrowError('Task not found')
            await runDelay()
            await assertion
        })
    })

    describe('create', () => {
        it('creates a task with completed=false, unshifts it, and returns it', async () => {
            const tasksApi = await loadFresh()

            vi.stubGlobal('crypto', {
                randomUUID: vi.fn(() => 'uuid-1'),
            } as unknown as Crypto)

            const createPromise = tasksApi.create({
                title: 'New Task',
                description: 'description',
                completed: false,
            } as Task)
            await runDelay()
            const created = await createPromise

            expect(created).toEqual({
                id: 'uuid-1',
                title: 'New Task',
                description: 'description',
                completed: false,
            })

            const listPromise = tasksApi.getAll(1, 10)
            await runDelay()
            const list = await listPromise

            expect(list.total).toBe(26)
            expect(list.data[0]).toEqual(created)
        })
    })

    describe('update', () => {
        it('returns undefined when updating a non-existent task (current behavior)', async () => {
            const tasksApi = await loadFresh()

            const promise = tasksApi.update('missing', { completed: true })
            await runDelay()
            const updated = await promise

            expect(updated).toBeUndefined()
        })
    })

    describe('delete', () => {
        it('removes a task by id', async () => {
            const tasksApi = await loadFresh()

            const beforePromise = tasksApi.getAll(1, 10)
            await runDelay()
            const before = await beforePromise
            expect(before.total).toBe(25)

            const delPromise = tasksApi.delete('3')
            await runDelay()
            await delPromise

            const afterPromise = tasksApi.getAll(1, 10)
            await runDelay()
            const after = await afterPromise

            expect(after.total).toBe(24)
            expect(after.data.some(t => t.id === '3')).toBe(false)
        })

        it('does not throw when deleting a non-existent id (idempotent)', async () => {
            const tasksApi = await loadFresh()

            const delPromise = tasksApi.delete('missing')
            await runDelay()
            await expect(delPromise).resolves.toBeUndefined()

            const listPromise = tasksApi.getAll(1, 10)
            await runDelay()
            const list = await listPromise
            expect(list.total).toBe(25)
        })
    })

    describe('state isolation', () => {
        it('starts from the initial list on a fresh import (module reset works)', async () => {
            const tasksApi = await loadFresh()

            const listPromise = tasksApi.getAll(1, 5)
            await runDelay()
            const list = await listPromise

            // If previous tests mutated the in-module `tasks`, this would change.
            expect(list.total).toBe(25)
            expect(list.data.map((t: Task) => t.id)).toEqual(['1', '2', '3', '4', '5'])
        })
    })
})