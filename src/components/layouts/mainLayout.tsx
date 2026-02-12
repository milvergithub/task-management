import { AppSidebar } from '@/components/app-sidebar.tsx';
import { useAuthStore } from '@/store/auth.store.ts';
import { Toaster } from "@/components/ui/sonner.tsx"
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Suspense } from "react";


export function MainLayout() {
    const token = useAuthStore((state) => state.token)
    const isAuthenticated = Boolean(token)
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return (
        <div className="flex h-screen w-screen">
            <Toaster />
            <AppSidebar />
            <main className="relative flex-1 bg-background overflow-y-auto overflow-x-hidden p-8">
                <Suspense>
                    <Outlet />
                </Suspense>
                <Toaster />
            </main>
        </div>
    );
}
