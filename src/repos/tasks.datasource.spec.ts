import { describe, it, expect, vi, beforeEach } from 'vitest'

import type { PaginationResponse } from '@/interfaces/paginated.response'
import type { Task } from '@/interfaces/types/task'

// Mock the service used by the datasource
vi.mock('@/mocks/tasks.service.ts', () => {
    return {
        tasksApi: {
            getAll: vi.fn(),
            getById: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
    }
})

import { tasksApi } from '@/mocks/tasks.service.ts'
import { tasksDataSource } from '@/repos/tasks.datasource.ts'

describe('tasksDataSource', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getAll', () => {
        it('forwards args to tasksApi.getAll and returns its result', async () => {
            const response: PaginationResponse<Task> = {
                data: [{ id: '1', title: 'A', completed: false }],
                total: 1,
                page: 1,
                pageSize: 5,
                totalPages: 1,
            }

            vi.mocked(tasksApi.getAll).mockResolvedValue(response)

            const result = await tasksDataSource.getAll(1, 5)

            expect(tasksApi.getAll).toHaveBeenCalledTimes(1)
            expect(tasksApi.getAll).toHaveBeenCalledWith(1, 5)
            expect(result).toBe(response)
        })

        it('works when called with no args (undefineds are forwarded)', async () => {
            const response: PaginationResponse<Task> = {
                data: [],
                total: 0,
                page: 1,
                pageSize: 5,
                totalPages: 0,
            }

            vi.mocked(tasksApi.getAll).mockResolvedValue(response)

            const result = await tasksDataSource.getAll()

            expect(tasksApi.getAll).toHaveBeenCalledTimes(1)
            expect(tasksApi.getAll).toHaveBeenCalledWith(undefined, undefined)
            expect(result).toBe(response)
        })

        it('propagates errors from tasksApi.getAll', async () => {
            const err = new Error('getAll failed')
            vi.mocked(tasksApi.getAll).mockRejectedValue(err)

            await expect(tasksDataSource.getAll(1, 5)).rejects.toBe(err)
        })
    })

    describe('getById', () => {
        it('calls tasksApi.getById and returns the task', async () => {
            const task: Task = { id: '1', title: 'Learn React', completed: false }
            vi.mocked(tasksApi.getById).mockResolvedValue(task)

            const result = await tasksDataSource.getById('1')

            expect(tasksApi.getById).toHaveBeenCalledTimes(1)
            expect(tasksApi.getById).toHaveBeenCalledWith('1')
            expect(result).toBe(task)
        })

        it('propagates errors from tasksApi.getById', async () => {
            const err = new Error('Task not found')
            vi.mocked(tasksApi.getById).mockRejectedValue(err)

            await expect(tasksDataSource.getById('missing')).rejects.toBe(err)
            expect(tasksApi.getById).toHaveBeenCalledWith('missing')
        })
    })

    describe('create', () => {
        it('calls tasksApi.create with title and returns the created task', async () => {
            const created: Task = { id: 'new', title: 'Write tests', completed: false }
            vi.mocked(tasksApi.create).mockResolvedValue(created)

            const result = await tasksDataSource.create('Write tests')

            expect(tasksApi.create).toHaveBeenCalledTimes(1)
            expect(tasksApi.create).toHaveBeenCalledWith('Write tests')
            expect(result).toBe(created)
        })

        it('propagates errors from tasksApi.create', async () => {
            const err = new Error('create failed')
            vi.mocked(tasksApi.create).mockRejectedValue(err)

            await expect(tasksDataSource.create('X')).rejects.toBe(err)
            expect(tasksApi.create).toHaveBeenCalledWith('X')
        })
    })

    describe('update', () => {
        it('calls tasksApi.update with (id, updates) and returns the updated task', async () => {
            const updated: Task = { id: '1', title: 'Updated', completed: true }
            const patch: Partial<Task> = { title: 'Updated', completed: true }

            vi.mocked(tasksApi.update).mockResolvedValue(updated)

            const result = await tasksDataSource.update('1', patch)

            expect(tasksApi.update).toHaveBeenCalledTimes(1)
            expect(tasksApi.update).toHaveBeenCalledWith('1', patch)
            expect(result).toBe(updated)
        })

        it('propagates errors from tasksApi.update', async () => {
            const err = new Error('update failed')
            vi.mocked(tasksApi.update).mockRejectedValue(err)

            await expect(tasksDataSource.update('1', { completed: true })).rejects.toBe(err)
            expect(tasksApi.update).toHaveBeenCalledWith('1', { completed: true })
        })
    })

    describe('delete', () => {
        it('calls tasksApi.delete and returns true when it resolves', async () => {
            vi.mocked(tasksApi.delete).mockResolvedValue(undefined)

            const result = await tasksDataSource.delete('1')

            expect(tasksApi.delete).toHaveBeenCalledTimes(1)
            expect(tasksApi.delete).toHaveBeenCalledWith('1')
            expect(result).toBe(true)
        })

        it('propagates errors from tasksApi.delete (does not return true)', async () => {
            const err = new Error('delete failed')
            vi.mocked(tasksApi.delete).mockRejectedValue(err)

            await expect(tasksDataSource.delete('1')).rejects.toBe(err)
            expect(tasksApi.delete).toHaveBeenCalledWith('1')
        })
    })
})