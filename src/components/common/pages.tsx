import { cn } from "@/lib/utils.ts";
import * as React from "react";

const ListPage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-4 w-full h-full", className)} {...props} />
  )
);
ListPage.displayName = "ListPage";

export { ListPage };
