import type { PaginationResponse } from '@/interfaces/paginated.response'
import type { Task } from '@/interfaces/types/task'
import { tasksDataSource } from '@/repos/tasks.datasource.ts';

export async function getTasksAsync(
    page?: number
): Promise<PaginationResponse<Task>> {
    return tasksDataSource.getAll(page)
}

export async function getTaskAsync(id: string): Promise<Task> {
    return tasksDataSource.getById(id)
}

export async function addTaskAsync(task: Task): Promise<Task> {
    return tasksDataSource.create(task)
}

export async function editTaskAsync(
    id: string,
    request: Partial<Task>
): Promise<Task> {
    return tasksDataSource.update(id, request)
}

export async function deleteTaskAsync(id: string): Promise<boolean> {
    return tasksDataSource.delete(id)
}