import type { Task } from '@/interfaces/types/task'
import { tasksApi } from '@/mocks/tasks.service.ts';

export const tasksDataSource = {
    getAll: (page?: number, pageSize?: number) =>
        tasksApi.getAll(page, pageSize),

    getById: async (id: string): Promise<Task> => {
        return await tasksApi.getById(id);
    },

    create: (task: Task) =>
        tasksApi.create(task),

    update: (id: string, updates: Partial<Task>) =>
        tasksApi.update(id, updates),

    delete: async (id: string): Promise<boolean> => {
        await tasksApi.delete(id)
        return true
    },
}
