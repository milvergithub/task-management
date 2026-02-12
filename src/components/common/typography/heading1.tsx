import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils.ts";

const heading1Variants = cva("text-primary font-bold font-degular", {
  variants: {
    size: {
      lg: "text-[72px]",
      default: "text-[48px]/[56px]",
      sm: "text-[36px]/[48px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface Heading1Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof heading1Variants> {}

export function Heading1({ className, size, ...props }: Heading1Props) {
  return <h1 className={cn(heading1Variants({ size }), className)} {...props} />;
}
