import type { PaginationResponse } from '@/interfaces/paginated.response.ts'
import type { Task } from '@/interfaces/types/task.ts'

/**
 * In-memory task collection used to simulate a backend database.
 * This data will reset on page refresh.
 */
let tasks: Task[] = [
    { id: '1', title: 'Learn React', completed: true, description: 'Learn how to use React' },
    { id: '2', title: 'Build Tasks App', completed: true, description: 'Build a simple tasks app using React' },
    { id: '3', title: 'Setup Vite', completed: true, description: 'Set up Vite for React development' },
    { id: '4', title: 'Add Tailwind', completed: true, description: 'Add Tailwind CSS to the project' },
    { id: '5', title: 'Write Tests', completed: true, description: 'Write unit tests for the app' },
    { id: '6', title: 'Configure ESLint', completed: true, description: 'Configure ESLint for code quality' },
    { id: '7', title: 'Setup Prettier', completed: false, description: 'Add Prettier for code formatting' },
    { id: '8', title: 'Create Task Model', completed: true, description: 'Define Task interface and types' },
    { id: '9', title: 'Implement Task List', completed: false, description: 'Render list of tasks in UI' },
    { id: '10', title: 'Add Task Form', completed: true, description: 'Create form to add new tasks' },
    { id: '11', title: 'Edit Task Feature', completed: false, description: 'Allow users to edit tasks' },
    { id: '12', title: 'Delete Task Feature', completed: true, description: 'Implement task deletion' },
    { id: '13', title: 'Toggle Task Status', completed: false, description: 'Mark tasks as completed or pending' },
    { id: '14', title: 'Persist Tasks', completed: true, description: 'Store tasks in localStorage' },
    { id: '15', title: 'Filter Tasks', completed: false, description: 'Filter tasks by status' },
    { id: '16', title: 'Sort Tasks', completed: true, description: 'Sort tasks by title or status' },
    { id: '17', title: 'Add Loading State', completed: false, description: 'Show loading indicator' },
    { id: '18', title: 'Handle Errors', completed: true, description: 'Handle and display errors gracefully' },
    { id: '19', title: 'Responsive Design', completed: false, description: 'Make UI responsive for all screens' },
    { id: '20', title: 'Improve Accessibility', completed: true, description: 'Add ARIA labels and keyboard support' },
    { id: '21', title: 'Mock API', completed: false, description: 'Mock backend API using MSW' },
    { id: '22', title: 'Integrate React Query', completed: true, description: 'Use React Query for data fetching' },
    { id: '23', title: 'Add Authentication', completed: false, description: 'Simulate JWT authentication' },
    { id: '24', title: 'Protect Routes', completed: true, description: 'Restrict access to authenticated users' },
    { id: '25', title: 'Deploy App', completed: false, description: 'Deploy application to production' },
]

/**
 * Utility function to simulate network latency.
 *
 * @param ms - Delay in milliseconds (default: 500ms)
 * @returns Promise that resolves after the specified delay
 */
const delay = (ms = 500): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms))

/**
 * Mock Tasks API.
 *
 * Simulates CRUD operations and pagination for tasks.
 * Intended for development, demos, and testing purposes.
 */
export const tasksApi = {
    /**
     * Retrieves a paginated list of tasks.
     *
     * @param page - Current page number (1-based)
     * @param pageSize - Number of items per page
     * @returns Paginated response containing tasks and metadata
     */
    async getAll(
        page = 1,
        pageSize = 12
    ): Promise<PaginationResponse<Task>> {
        await delay()

        const start = (page - 1) * pageSize
        const end = start + pageSize

        const items = tasks.slice(start, end)

        return {
            data: items,
            total: tasks.length,
            page,
            pageSize,
            totalPages: Math.ceil(tasks.length / pageSize),
        }
    },

    /**
     * Retrieves a task by its unique identifier.
     *
     * @param id - Task ID
     * @throws Error if the task is not found
     * @returns The requested task
     */
    async getById(id: string): Promise<Task> {
        await delay()

        const task = tasks.find(t => t.id === id)
        if (!task) {
            throw new Error('Task not found')
        }

        return task
    },

    /**
     * Creates a new task.
     *
     * @param task - Task data to create
     * @returns The newly created task
     */
    async create(task: Task): Promise<Task> {
        await delay()

        const newTask: Task = {
            // @ts-expect-error crypto.randomUUID is available in modern browsers
            id: crypto.randomUUID(),
            ...task,
        }

        tasks.unshift(newTask)
        return newTask
    },

    /**
     * Updates an existing task.
     *
     * @param id - Task ID
     * @param updates - Partial task fields to update
     * @returns The updated task
     */
    async update(id: string, updates: Partial<Task>): Promise<Task> {
        await delay()

        let updated!: Task
        tasks = tasks.map(task => {
            if (task.id === id) {
                updated = { ...task, ...updates }
                return updated
            }
            return task
        })

        return updated
    },

    /**
     * Deletes a task by ID.
     *
     * @param id - Task ID
     * @returns Void promise once deletion is complete
     */
    async delete(id: string): Promise<void> {
        await delay()
        tasks = tasks.filter(task => task.id !== id)
    },
}
