import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils.ts";

const heading4Variants = cva("text-primary font-bold font-degular", {
  variants: {
    size: {
      lg: "text-[20px]/[28px]",
      default: "text-[18px]/[24px]",
      sm: "text-[16px]/[24px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface Heading4Props
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof heading4Variants> {}

export function Heading4({ className, size, ...props }: Heading4Props) {
  return <h4 className={cn(heading4Variants({ size }), className)} {...props} />;
}
