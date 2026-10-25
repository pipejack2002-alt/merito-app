import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-45 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-r from-accent to-sky-600 text-accent-fg shadow-xs hover:brightness-105 hover:shadow-sm",
        secondary:
          "bg-paper text-ink border border-border hover:bg-surface hover:border-accent/40 shadow-2xs",
        outline:
          "border border-border bg-surface/80 text-ink hover:bg-paper hover:border-accent/40 shadow-2xs",
        ghost: "text-ink hover:bg-paper",
        rule: "bg-linear-to-r from-rule to-teal-700 text-accent-fg shadow-xs hover:brightness-105",
        danger: "bg-bad text-accent-fg shadow-xs hover:bg-bad/90",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 rounded-lg px-3.5 text-[13px]",
        lg: "h-12 rounded-xl px-6 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
