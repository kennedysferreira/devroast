import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badge = tv({
  base: "inline-flex items-center gap-1.5 text-xs font-mono",
  variants: {
    variant: {
      critical: "text-accent-red",
      warning: "text-accent-amber",
      todo: "text-accent-green",
      info: "text-text-secondary",
    },
  },
  defaultVariants: { variant: "info" },
});

type BadgeVariants = VariantProps<typeof badge>;
type BadgeProps = ComponentProps<"span"> & BadgeVariants;

export function Badge({ variant, className, children, ...props }: BadgeProps) {
  return (
    <span className={badge({ variant, className })} {...props}>
      <span aria-hidden>●</span>
      {children}
    </span>
  );
}
