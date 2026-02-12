import type { PaginationResponse } from '@/interfaces/paginated.response.ts';
import type { Task } from '@/interfaces/types/task.ts';
import { addTaskAsync, deleteTaskAsync, editTaskAsync, getTaskAsync, getTasksAsync } from '@/repos/taskRepo.ts';
import {
    keepPreviousData,
    useMutation,
    useQuery, useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ApiPath } from '@/enums/apiPath'
import { retryQuery } from '@/lib/query'

export function useGetTasks(page?: number) {
    return useQuery<
        PaginationResponse<Task>,
        AxiosError
    >({
        queryKey: [ApiPath.Tasks, page],
        queryFn: async () => await getTasksAsync(page),
        retry: retryQuery,
        placeholderData: keepPreviousData,
    })
}

export function useGetTask(id?: string) {
    return useQuery<Task, AxiosError>({
        queryKey: [ApiPath.Tasks, id],
        queryFn: async () => await getTaskAsync(id!),
        enabled: !!id,
        retry: retryQuery,
    })
}

export function useAddTask() {
    const queryClient = useQueryClient();
    return useMutation<Task, AxiosError, Task>({
        mutationFn: async (task) => await addTaskAsync(task),
        retry: retryQuery,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ApiPath.Tasks] })
    })
}

interface EditTaskRequest {
    id: string
    request: Partial<Task>
}

export function useEditTask() {
    const queryClient = useQueryClient();
    return useMutation<Task, AxiosError, EditTaskRequest>({
        mutationFn: async ({ id, request }: EditTaskRequest) =>
            await editTaskAsync(id, request),
        retry: retryQuery,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ApiPath.Tasks] })
    })
}


export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation<boolean, AxiosError, string>({
        mutationFn: async (id: string) => await deleteTaskAsync(id),
        retry: retryQuery,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [ApiPath.Tasks] })
    })
}





