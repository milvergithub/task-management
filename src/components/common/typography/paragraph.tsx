import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils.ts";

const paragraphVariants = cva("text-primary", {
  variants: {
    size: {
      lg: "text-base",
      default: "text-sm",
      sm: "text-xs",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "default",
    weight: "normal",
  },
});

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export function Paragraph({ className, size, weight, ...props }: ParagraphProps) {
  return <p className={cn(paragraphVariants({ size, weight }), className)} {...props} />;
}
