"use client";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

export function HomeOptionsRow() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Toggle defaultChecked />
        <span className="font-mono text-sm text-text-tertiary">roast mode</span>
        <span className="font-mono text-xs text-text-tertiary">
          {"// maximum sarcasm enabled"}
        </span>
      </div>
      <Button variant="primary">$ roast_my_code</Button>
    </div>
  );
}
