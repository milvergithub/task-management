import { Badge } from '@/components/ui/badge.tsx';
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { Task } from "@/interfaces/types/task"

interface TasksTableProps {
    tasks: Task[]
    onEdit: (task: Task) => void
    onDelete: (id: string) => void
}

export function TasksTable({
                               tasks,
                               onEdit,
                               onDelete,
                           }: TasksTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks.map(task => (
                    <TableRow key={task.id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>
                            <Badge variant={task.completed ? 'secondary' : 'destructive'}>
                                {task.completed ? 'Done' : 'Pending'}
                            </Badge>
                        </TableCell>
                        <TableCell className="space-x-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onEdit(task)}
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => onDelete(task.id)}
                            >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
