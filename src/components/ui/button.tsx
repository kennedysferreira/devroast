import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "font-mono font-medium text-[13px]",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ],
  variants: {
    variant: {
      primary:
        "bg-accent-green text-page hover:bg-accent-green/80 focus-visible:ring-accent-green",
      secondary:
        "bg-surface text-text-primary border border-border hover:bg-border focus-visible:ring-border",
      outline:
        "border border-accent-green text-accent-green bg-transparent hover:bg-accent-green/10 focus-visible:ring-accent-green",
      ghost:
        "text-text-secondary bg-transparent hover:bg-surface hover:text-text-primary focus-visible:ring-border",
      destructive:
        "bg-accent-red text-text-primary hover:bg-accent-red/80 focus-visible:ring-accent-red",
    },
    size: {
      sm: "px-3 py-1.5 text-xs",
      md: "px-6 py-2.5",
      lg: "px-8 py-3 text-sm",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ComponentProps<"button"> & ButtonVariants;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={button({ variant, size, className })} {...props} />;
}
