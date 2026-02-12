import { type LucideIcon } from "lucide-react";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils.ts";
import { Icon } from "@/components/ui/icon.tsx";
import { Paragraph } from "@/components/common/typography/paragraph.tsx";
import { Heading2 } from "@/components/common/typography/heading2.tsx";
import { Heading4 } from "@/components/common/typography/heading4.tsx";

type ClassNames = {
  container: string;
  header: string;
  icon: string;
};

type HeaderProps = {
  type: "h2" | "h4";
  size: "sm" | "default" | "lg";
};

type Props = {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: Partial<ClassNames>;
  header?: HeaderProps;
};

export function PageTitle({
  icon,
  title,
  description,
  children,
  className,
  header = { type: "h2", size: "default" },
}: PropsWithChildren<Props>) {
  return (
    <div className={cn("flex flex-col gap-4", className?.container)}>
      <div className="flex flex-row items-center gap-4">
        <span className="bg-primary-container rounded-lg p-2.5 flex items-center justify-center shrink-0 ring-1 ring-inset ring-border">
          <Icon icon={icon} className={cn("text-primary size-7", className?.icon)} />
        </span>
        <div
          className={cn(
            "flex flex-row gap-4 items-center w-full justify-between",
            className?.header
          )}
        >
          {header.type === "h2" ? (
            <Heading2 size={header.size}>{title}</Heading2>
          ) : (
            <Heading4 size={header.size}>{title}</Heading4>
          )}
          {children}
        </div>
      </div>
      {description && <Paragraph>{description}</Paragraph>}
    </div>
  );
}
