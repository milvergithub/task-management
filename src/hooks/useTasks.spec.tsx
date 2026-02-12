import React from 'react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

import {
    useAddTask,
    useDeleteTask,
    useEditTask,
    useGetTasks,
} from '@/hooks/useTasks.ts'

import * as taskRepo from '@/repos/taskRepo'
import type { Task } from '@/interfaces/types/task'
import type { PaginationResponse } from '@/interfaces/paginated.response'

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    })

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>
    )
}

describe('useTasks hooks', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    describe('useGetTasks', () => {

        it('passes undefined page through to repo when no page is provided', async () => {
            const mock: PaginationResponse<Task> = {
                data: [],
                total: 0,
                page: 1,
                pageSize: 5,
                totalPages: 0,
            }

            const spy = vi.spyOn(taskRepo, 'getTasksAsync').mockResolvedValue(mock)

            const { result } = renderHook(() => useGetTasks(), {
                wrapper: createWrapper(),
            })

            await waitFor(() => expect(result.current.isSuccess).toBe(true))

            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith(undefined)
        })
    })

    describe('useAddTask', () => {
        it('calls addTaskAsync with the title', async () => {
            const created: Task = { id: 'n1', title: 'New Task', completed: false }
            const spy = vi.spyOn(taskRepo, 'addTaskAsync').mockResolvedValue(created)

            const { result } = renderHook(() => useAddTask(), {
                wrapper: createWrapper(),
            })

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const res = await result.current.mutateAsync('New Task')

            expect(res).toEqual(created)
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith('New Task')
        })
    })

    describe('useEditTask', () => {
        it('calls editTaskAsync with (id, request)', async () => {
            const updated: Task = { id: '1', title: 'Edited', completed: false }
            const spy = vi.spyOn(taskRepo, 'editTaskAsync').mockResolvedValue(updated)

            const { result } = renderHook(() => useEditTask(), {
                wrapper: createWrapper(),
            })

            const res = await result.current.mutateAsync({
                id: '1',
                request: { title: 'Edited' },
            })

            expect(res).toEqual(updated)
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith('1', { title: 'Edited' })
        })
    })

    describe('useDeleteTask', () => {
        it('calls deleteTaskAsync with id and returns boolean', async () => {
            const spy = vi.spyOn(taskRepo, 'deleteTaskAsync').mockResolvedValue(true)

            const { result } = renderHook(() => useDeleteTask(), {
                wrapper: createWrapper(),
            })

            const res = await result.current.mutateAsync('1')

            expect(res).toBe(true)
            expect(spy).toHaveBeenCalledTimes(1)
            expect(spy).toHaveBeenCalledWith('1')
        })
    })
})