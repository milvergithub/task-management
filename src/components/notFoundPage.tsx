import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button.tsx"

export function NotFoundPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
            <div className="mx-auto max-w-md text-center">
                <p className="text-sm font-medium text-muted-foreground">
                    404 error
                </p>

                <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Page not found
                </h1>

                <p className="mt-4 text-base text-muted-foreground">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <Button>
                        <Link to="/tasks">
                            Go to dashboard
                        </Link>
                    </Button>

                    <Button variant="outline">
                        <Link to="/login">
                            Back to login
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
