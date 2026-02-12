import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils.ts";

const heading2Variants = cva("text-primary font-bold font-degular", {
  variants: {
    size: {
      lg: "text-[48px]/[56px]",
      default: "text-[36px]/[48px]",
      sm: "text-[32px]/[40px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface Heading2Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof heading2Variants> {}

export function Heading2({ className, size, ...props }: Heading2Props) {
  return <h2 className={cn(heading2Variants({ size }), className)} {...props} />;
}
