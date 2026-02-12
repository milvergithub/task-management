import { MainLayout } from '@/components/layouts/mainLayout.tsx';
import { LoginPage } from '@/pages/auth/login.page.tsx';
import { TasksPage } from '@/pages/tasks/tasks.page.tsx';
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "",
        element: <MainLayout />,
        errorElement: <div>error</div>,
        children: [
            {
                path: "",
                element: <Navigate to="/tasks" replace />,
            },
            {
                path: "tasks",
                element: <TasksPage />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
]);

