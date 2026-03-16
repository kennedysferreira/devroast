import { twMerge } from "tailwind-merge";

export interface DiffLine {
  type: "added" | "removed" | "context";
  content: string;
}

interface DiffProps {
  lines: DiffLine[];
  className?: string;
}

export function Diff({ lines, className }: DiffProps) {
  return (
    <div
      className={twMerge(
        "bg-surface border border-border font-mono text-[13px] p-4 overflow-x-auto",
        className,
      )}
    >
      {lines.map((line, i) => (
        <div
          key={`${i}-${line.type}`}
          className={
            line.type === "added"
              ? "bg-diff-added"
              : line.type === "removed"
                ? "bg-diff-removed"
                : ""
          }
        >
          <span className="select-none text-text-tertiary pr-2">
            {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
          </span>
          {line.content}
        </div>
      ))}
    </div>
  );
}
