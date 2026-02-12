import { LoginPage } from '@/pages/auth/login.page.tsx';
import { useAuthStore } from '@/store/auth.store.ts';
import { render, waitFor } from "@testing-library/react"
import { screen } from "@testing-library/dom"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { BrowserRouter } from "react-router-dom"

vi.mock("@/store/auth.store.ts", () => ({
    useAuthStore: vi.fn(),
}))

describe("LoginPage", () => {
    const mockLogin = vi.fn()

    beforeEach(() => {
        (useAuthStore as any).mockReturnValue({
            login: mockLogin,
        })
    })

    it("renders login title, inputs and buttons", () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        const titles = screen.getAllByText(/sign in/i)
        expect(titles[0]).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument()
    })

    it("shows validation errors on empty submit", async () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        userEvent.click(screen.getByRole("button", { name: /sign in/i }))

        expect(await screen.findAllByText(/is required|valid email/i)).toHaveLength(2)
    })

    it("resets the form when clicking reset", async () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
        const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement

        await userEvent.type(emailInput, "test@example.com")
        await userEvent.type(passwordInput, "123456")

        expect(emailInput.value).toBe("test@example.com")
        expect(passwordInput.value).toBe("123456")

        await userEvent.click(screen.getByRole("button", { name: /reset/i }));
        await waitFor(() => {
            expect(emailInput.value).toBe("")
            expect(passwordInput.value).toBe("")
        })
    })

    it("shows error toast on invalid login", async () => {
        ;(useAuthStore as any).mockReturnValue({
            login: vi.fn(() => {
                throw new Error("Invalid credentials")
            }),
        })

        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        )

        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)

        await userEvent.type(emailInput, "wrong@example.com")
        await userEvent.type(passwordInput, "wrongpass")

        await userEvent.click(screen.getByRole("button", { name: /sign in/i }))
    })
})
