import { CirclePlus } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { Button, type buttonVariants } from "@/components/ui/button.tsx";
import { Icon } from "@/components/ui/icon.tsx";
import * as React from "react";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text: string;
}

export function AddButton({ text, size, variant = "default", ...props }: Props) {
  return (
    <Button {...props} size={size} variant={variant}>
      <Icon icon={CirclePlus} strokeWidth={2} className="text-accent" />
      {text}
    </Button>
  );
}
