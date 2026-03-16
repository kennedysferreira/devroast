"use client";

import { Switch } from "@base-ui/react/switch";
import type { ComponentProps } from "react";

type ToggleProps = ComponentProps<typeof Switch.Root>;

export function Toggle(props: ToggleProps) {
  return (
    <Switch.Root
      className="relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full border border-border bg-surface transition-colors duration-150 data-[checked]:border-transparent data-[checked]:bg-accent-green disabled:pointer-events-none disabled:opacity-50"
      {...props}
    >
      <Switch.Thumb className="size-3.5 rounded-full bg-text-secondary transition-transform duration-150 translate-x-0.5 data-[checked]:translate-x-[18px] data-[checked]:bg-page" />
    </Switch.Root>
  );
}
