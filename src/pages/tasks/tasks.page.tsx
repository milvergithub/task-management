import { useTasksPage } from '@/pages/tasks/hooks/useTasksPage.ts';
import { TasksTable } from '@/pages/tasks/tasksTable.tsx';
import { Layers } from 'lucide-react';
import { AddButton } from '@/components/common/addButton';
import { ListPage } from '@/components/common/pages';
import { PageTitle } from '@/components/common/pageTitle';
import { Paginator } from '@/components/common/paginator';
import { TaskFormDialog } from '@/pages/tasks/task-form.dialog';

export function TasksPage() {
    const {
        tasks,
        pagination,
        isLoading,
        page,
        open,
        selectedTask,
        setPage,
        setOpen,
        setSelectedTask,
        handleSubmit,
        deleteTask,
    } = useTasksPage()

    return (
        <ListPage>
            <PageTitle
                icon={Layers}
                title="Tasks"
                description="Explore and manage tasks, or add new ones using the button at the top right."
            >
                <AddButton
                    size="lg"
                    text="Add Task"
                    onClick={() => {
                        setSelectedTask(null)
                        setOpen(true)
                    }}
                />
            </PageTitle>

            <TaskFormDialog
                open={open}
                task={selectedTask}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
            />

            {isLoading ? (
                <p>Loading tasks...</p>
            ) : (
                <>
                    <TasksTable
                        tasks={tasks}
                        onEdit={(task) => {
                            setSelectedTask(task)
                            setOpen(true)
                        }}
                        onDelete={(id) => deleteTask.mutate(id)}
                    />

                    {pagination && (
                        <Paginator
                            totalPages={pagination.totalPages}
                            currentPage={page}
                            onPageChange={setPage}
                        />
                    )}
                </>
            )}
        </ListPage>
    )
}
