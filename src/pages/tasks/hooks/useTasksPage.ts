import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { ApiPath } from "@/enums/apiPath"
import type { Task } from "@/interfaces/types/task"
import {
    useGetTasks,
    useAddTask,
    useEditTask,
    useDeleteTask,
} from "@/hooks/useTasks"

export function useTasksPage() {
    const [page, setPage] = useState(1)
    const [open, setOpen] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    const queryClient = useQueryClient()

    const { data, isLoading } = useGetTasks(page)
    const addTask = useAddTask()
    const editTask = useEditTask()
    const deleteTask = useDeleteTask()

    const tasks = data?.data ?? []

    const refresh = () =>
        queryClient.invalidateQueries({ queryKey: [ApiPath.Tasks] })

    const handleSubmit = async (task: Partial<Task>) => {
        if (task.id) {
            editTask.mutate({
                id: task.id,
                request: { ...task },
            })
        } else {
            addTask.mutate(task as Task);
        }
        await refresh();
        setOpen(false);
    }

    return {
        // data
        tasks,
        pagination: data,
        isLoading,

        // ui state
        page,
        open,
        selectedTask,

        // actions
        setPage,
        setOpen,
        setSelectedTask,
        handleSubmit,
        deleteTask,
    }
}
