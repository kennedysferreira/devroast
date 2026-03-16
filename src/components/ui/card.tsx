import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const card = tv({
  base: "border border-border p-5 flex flex-col gap-3",
});

type CardProps = ComponentProps<"div">;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div className={card({ className })} {...props}>
      {children}
    </div>
  );
}
