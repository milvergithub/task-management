import { persist } from 'zustand/middleware'
import { create } from 'zustand/react';

interface AuthState {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}
export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            token: null,
            login: (token: string) => set({ token }),
            logout: () => set({ token: null }),
        }),
        {
            name: 'auth-storage',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            getStorage: () => localStorage,
        }
    )
)
