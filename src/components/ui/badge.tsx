import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-accent text-accent-fg shadow-2xs",
        rule: "border-transparent bg-rule text-accent-fg shadow-2xs",
        outline: "border-border bg-surface/80 text-muted",
        paper: "border-border bg-paper text-ink",
        ok: "border-ok/25 bg-ok-soft text-ok",
        bad: "border-bad/25 bg-bad-soft text-bad",
        warn: "border-warn/25 bg-warn-soft text-warn",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
