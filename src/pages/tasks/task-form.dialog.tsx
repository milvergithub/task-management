"use client"

import { Switch } from '@/components/ui/switch.tsx';
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"

import type { Task } from "@/interfaces/types/task"
import { taskSchema, type TaskFormValues } from "@/pages/tasks/taskSchema"

interface Props {
    open: boolean
    task?: Task | null
    onClose: () => void
    onSubmit: (data: Partial<Task>) => void
}

export function TaskFormDialog({
                                   open,
                                   task,
                                   onClose,
                                   onSubmit,
                               }: Props) {
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            completed: false
        },
    })

    // Sync form when opening / editing
    useEffect(() => {
        form.reset({
            title: task?.title ?? "",
            description: task?.description ?? "",
            completed: task?.completed ?? false
        })
    }, [task, open, form])

    function handleSubmit(data: TaskFormValues) {
        onSubmit({
            ...task,
            ...data,
        })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {task ? "Edit task" : "New task"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    id="task-form"
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <FieldGroup>
                        {/* Title */}
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="task-title">
                                        Title
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="task-title"
                                        placeholder="Task title"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        {/* Description */}
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="task-description">
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="task-description"
                                            placeholder="Task description"
                                            rows={4}
                                            className="resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {(field.value?.length ?? 0)}/500
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>

                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        {/* Completed */}
                        <Controller
                            name="completed"
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <div className="flex items-center justify-between">
                                        <FieldLabel htmlFor="task-completed">
                                            Completed
                                        </FieldLabel>
                                        <Switch
                                            id="task-completed"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <Button
                        type="submit"
                        form="task-form"
                        disabled={!form.formState.isDirty}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
