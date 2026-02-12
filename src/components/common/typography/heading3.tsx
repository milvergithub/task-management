import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils.ts";

const heading3Variants = cva("text-primary font-bold font-degular", {
  variants: {
    size: {
      lg: "text-[36px]/[48px]",
      default: "text-[32px]/[40px]",
      sm: "text-[24px]/[32px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface Heading3Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof heading3Variants> {}

export function Heading3({ className, size, ...props }: Heading3Props) {
  return <h3 className={cn(heading3Variants({ size }), className)} {...props} />;
}
