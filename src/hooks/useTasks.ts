import type { PaginationResponse } from '@/interfaces/paginated.response.ts'
import type { Task } from '@/interfaces/types/task.ts'
import {
    addTaskAsync,
    deleteTaskAsync,
    editTaskAsync,
    getTaskAsync,
    getTasksAsync,
} from '@/repos/taskRepo.ts'

import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ApiPath } from '@/enums/apiPath'
import { retryQuery } from '@/lib/query'

/**
 * Hook to fetch a paginated list of tasks.
 *
 * Uses React Query to handle caching, loading states,
 * background refetching, and pagination.
 *
 * @param page - Page number (1-based)
 * @returns React Query result containing paginated tasks
 */
export function useGetTasks(page?: number) {
    return useQuery<PaginationResponse<Task>, AxiosError>({
        queryKey: [ApiPath.Tasks, page],
        queryFn: async () => await getTasksAsync(page),
        retry: retryQuery,
        placeholderData: keepPreviousData,
    })
}

/**
 * Hook to fetch a single task by ID.
 *
 * The query is only executed when an ID is provided.
 *
 * @param id - Task identifier
 * @returns React Query result containing the task
 */
export function useGetTask(id?: string) {
    return useQuery<Task, AxiosError>({
        queryKey: [ApiPath.Tasks, id],
        queryFn: async () => await getTaskAsync(id!),
        enabled: !!id,
        retry: retryQuery,
    })
}

/**
 * Hook to create a new task.
 *
 * Automatically invalidates the tasks list cache on success
 * to keep UI state in sync.
 *
 * @returns Mutation object for creating tasks
 */
export function useAddTask() {
    const queryClient = useQueryClient()

    return useMutation<Task, AxiosError, Task>({
        mutationFn: async task => await addTaskAsync(task),
        retry: retryQuery,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [ApiPath.Tasks] }),
    })
}

/**
 * Request payload for updating a task.
 */
interface EditTaskRequest {
    /** Task identifier */
    id: string
    /** Partial task data to update */
    request: Partial<Task>
}

/**
 * Hook to update an existing task.
 *
 * Invalidates the tasks list cache after a successful update
 * to ensure fresh data is displayed.
 *
 * @returns Mutation object for editing tasks
 */
export function useEditTask() {
    const queryClient = useQueryClient();
    return useMutation<Task, AxiosError, EditTaskRequest>({
        mutationFn: async ({ id, request }: EditTaskRequest) =>
            await editTaskAsync(id, request),
        retry: retryQuery,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [ApiPath.Tasks] }),
    })
}

/**
 * Hook to delete a task.
 *
 * Invalidates the tasks list cache on success.
 *
 * @returns Mutation object for deleting tasks
 */
export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation<boolean, AxiosError, string>({
        mutationFn: async (id: string) => await deleteTaskAsync(id),
        retry: retryQuery,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ApiPath.Tasks] })
    })
}
