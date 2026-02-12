import { describe, it, expect, vi, beforeEach } from 'vitest'

import type { PaginationResponse } from '@/interfaces/paginated.response'
import type { Task } from '@/interfaces/types/task'

// Mock the datasource used by the repo
vi.mock('@/repos/tasks.datasource.ts', () => {
    return {
        tasksDataSource: {
            getAll: vi.fn(),
            getById: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        },
    }
})

import { tasksDataSource } from '@/repos/tasks.datasource.ts'
import {
    addTaskAsync,
    deleteTaskAsync,
    editTaskAsync,
    getTaskAsync,
    getTasksAsync,
} from '@/repos/taskRepo'

describe('taskRepo', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getTasksAsync', () => {
        it('calls tasksDataSource.getAll with (page, 5) and returns the result', async () => {
            const response: PaginationResponse<Task> = {
                data: [
                    { id: 't1', title: 'A', completed: false },
                    { id: 't2', title: 'B', completed: true },
                ],
                total: 25,
                page: 2,
                pageSize: 12,
                totalPages: 3,
            }

            vi.mocked(tasksDataSource.getAll).mockResolvedValue(response)

            const result = await getTasksAsync(2)

            expect(tasksDataSource.getAll).toHaveBeenCalledTimes(1)
            expect(tasksDataSource.getAll).toHaveBeenCalledWith(2)
            expect(result).toBe(response)
        })

        it('passes undefined page through to tasksDataSource.getAll and returns the result', async () => {
            const response: PaginationResponse<Task> = {
                data: [],
                total: 0,
                page: 1,
                pageSize: 5,
                totalPages: 0,
            }

            vi.mocked(tasksDataSource.getAll).mockResolvedValue(response)

            const result = await getTasksAsync()

            expect(tasksDataSource.getAll).toHaveBeenCalledTimes(1)
            expect(tasksDataSource.getAll).toHaveBeenCalledWith(undefined)
            expect(result).toBe(response)
        })

        it('propagates errors from tasksDataSource.getAll', async () => {
            const err = new Error('boom')
            vi.mocked(tasksDataSource.getAll).mockRejectedValue(err)

            await expect(getTasksAsync(1)).rejects.toBe(err)
            expect(tasksDataSource.getAll).toHaveBeenCalledTimes(1)
            expect(tasksDataSource.getAll).toHaveBeenCalledWith(1)
        })
    })

    describe('getTaskAsync', () => {
        it('calls tasksDataSource.getById and returns the task', async () => {
            const task: Task = { id: '1', title: 'Learn React', completed: false }
            vi.mocked(tasksDataSource.getById).mockResolvedValue(task)

            const result = await getTaskAsync('1')

            expect(tasksDataSource.getById).toHaveBeenCalledTimes(1)
            expect(tasksDataSource.getById).toHaveBeenCalledWith('1')
            expect(result).toBe(task)
        })

        it('propagates errors from tasksDataSource.getById', async () => {
            const err = new Error('Task not found')
            vi.mocked(tasksDataSource.getById).mockRejectedValue(err)

            await expect(getTaskAsync('missing')).rejects.toBe(err)
            expect(tasksDataSource.getById).toHaveBeenCalledWith('missing')
        })
    })

    describe('addTaskAsync', () => {
        it('calls tasksDataSource.create with title and returns the created task', async () => {
            const created: Task = { id: 'new', title: 'Write tests', completed: false }
            vi.mocked(tasksDataSource.create).mockResolvedValue(created)

            const result = await addTaskAsync({ title: 'Write tests'} as Task)

            expect(tasksDataSource.create).toHaveBeenCalledTimes(1)
            expect(tasksDataSource.create).toHaveBeenCalledWith({ title: 'Write tests'} as Task)
            expect(result).toBe(created)
        })

        it('propagates errors from tasksDataSource.create', async () => {
            const err = new Error('create failed')
            vi.mocked(tasksDataSource.create).mockRejectedValue(err)

            await expect(addTaskAsync({ title: 'X'} as Task)).rejects.toBe(err)
            expect(tasksDataSource.create).toHaveBeenCalledWith({ title: 'X'} as Task)
        })
    })

    describe('editTaskAsync', () => {
        it('calls tasksDataSource.update with (id, request) and returns the updated task', async () => {
            const updated: Task = { id: '1', title: 'Updated', completed: true }
            const patch: Partial<Task> = { title: 'Updated', completed: true }

            vi.mocked(tasksDataSource.update).mockResolvedValue(updated)

            const result = await editTaskAsync('1', patch)

            expect(tasksDataSource.update).toHaveBeenCalledTimes(1)
            expect(tasksDataSource.update).toHaveBeenCalledWith('1', patch)
            expect(result).toBe(updated)
        })

        it('propagates errors from tasksDataSource.update', async () => {
            const err = new Error('update failed')
            vi.mocked(tasksDataSource.update).mockRejectedValue(err)

            await expect(editTaskAsync('1', { completed: true })).rejects.toBe(err)
            expect(tasksDataSource.update).toHaveBeenCalledWith('1', { completed: true })
        })
    })

    describe('deleteTaskAsync', () => {
        it('calls tasksDataSource.delete with id and returns the boolean', async () => {
            vi.mocked(tasksDataSource.delete).mockResolvedValue(true)

            const result = await deleteTaskAsync('1')

            expect(tasksDataSource.delete).toHaveBeenCalledTimes(1)
            expect(tasksDataSource.delete).toHaveBeenCalledWith('1')
            expect(result).toBe(true)
        })

        it('propagates errors from tasksDataSource.delete', async () => {
            const err = new Error('delete failed')
            vi.mocked(tasksDataSource.delete).mockRejectedValue(err)

            await expect(deleteTaskAsync('1')).rejects.toBe(err)
            expect(tasksDataSource.delete).toHaveBeenCalledWith('1')
        })
    })
})