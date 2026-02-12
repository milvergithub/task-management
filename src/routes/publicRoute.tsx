import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

export function PublicRoute() {
    const token = useAuthStore((state) => state.token)

    if (token) {
        return <Navigate to="/tasks" replace />
    }

    return <Outlet />
}
