import { cn } from "@/lib/utils.ts";
import type { LucideProps } from "lucide-react";

type IconProps = {
  icon: React.FC<LucideProps>;
  className?: string;
  hidden?: boolean;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

export function Icon({ icon: Icon, className, hidden, strokeWidth = 1, style }: IconProps) {
  return (
    <Icon
      className={cn("text-inherit size-3.5", className)}
      strokeWidth={strokeWidth}
      aria-hidden={hidden}
      style={style}
    />
  );
}
