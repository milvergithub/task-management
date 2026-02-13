import { persist } from 'zustand/middleware'
import { create } from 'zustand/react'

/**
 * Authentication state definition.
 *
 * Manages the authentication token and exposes
 * actions to log in and log out.
 */
interface AuthState {
    /**
     * Authentication token (JWT or similar).
     * `null` means the user is not authenticated.
     */
    token: string | null

    /**
     * Stores the authentication token.
     *
     * @param token - JWT or session token
     */
    login: (token: string) => void

    /**
     * Clears the authentication token and logs the user out.
     */
    logout: () => void
}

/**
 * Global authentication store.
 *
 * Uses Zustand with persistence middleware to keep
 * the authentication state stored in `localStorage`
 * across page reloads.
 */
export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            token: null,

            login: (token: string) => set({ token }),

            logout: () => set({ token: null }),
        }),
        {
            /**
             * Storage key used in localStorage.
             */
            name: 'auth-storage',

            /**
             * Storage provider.
             *
             * Explicitly uses `localStorage` to persist
             * authentication state in the browser.
             */
            // @ts-expect-error Zustand typing compatibility
            getStorage: () => localStorage,
        }
    )
)
