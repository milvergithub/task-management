import { Toaster } from '@/components/ui/sonner.tsx';
import { mockUsers } from '@/mocks/auth.mock.ts';
import { type LoginFormValues, loginSchema } from '@/pages/auth/loginSchema.ts';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field.tsx"
import { Input } from "@/components/ui/input.tsx"
import { useAuthStore } from "@/store/auth.store.ts"

export function LoginPage() {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginFormValues) {
        try {
            // Simulate API delay
            await new Promise(res => setTimeout(res, 800))

            const user = mockUsers.find(
                u => u.email === data.email && u.password === data.password
            )

            if (!user) {
                throw new Error('Invalid credentials')
            }

            // Store token
            login(user.token)

            toast.success('Successfully signed in')
            navigate('/tasks')
        } catch {
            toast.error('Invalid email or password')
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <Toaster />
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                    <CardDescription>
                        Access your task management system
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        id="login-form"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FieldGroup>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="login-email">
                                            Email
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="login-email"
                                            type="email"
                                            placeholder="email@example.com"
                                            autoComplete="email"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="login-password">
                                            Password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="login-password"
                                            type="password"
                                            placeholder="••••••••"
                                            autoComplete="current-password"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldGroup>
                    </form>
                </CardContent>

                <CardFooter>
                    <Field orientation="horizontal">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                        >
                            Reset
                        </Button>
                        <Button
                            type="submit"
                            form="login-form"
                        >
                            Sign in
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
        </div>
    )
}