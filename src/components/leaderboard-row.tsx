import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import { Badge } from "@/components/ui/badge";

function LeaderboardRowRoot({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "grid grid-cols-[48px_72px_1fr_100px] gap-4 border-b border-border py-4 items-start",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function LeaderboardRowRank({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={twMerge("font-mono text-xs text-text-tertiary", className)}
      {...props}
    >
      {children}
    </span>
  );
}

function LeaderboardRowScore({ children }: { children: React.ReactNode }) {
  return <Badge variant="critical">{children}</Badge>;
}

function LeaderboardRowCode({
  className,
  children,
  ...props
}: ComponentProps<"pre">) {
  return (
    <pre
      className={twMerge(
        "bg-elevated p-3 text-[11px] font-mono text-text-secondary overflow-x-auto",
        className,
      )}
      {...props}
    >
      {children}
    </pre>
  );
}

function LeaderboardRowLang({ children }: { children: React.ReactNode }) {
  return <Badge variant="info">{children}</Badge>;
}

export const LeaderboardRow = Object.assign(LeaderboardRowRoot, {
  Rank: LeaderboardRowRank,
  Score: LeaderboardRowScore,
  Code: LeaderboardRowCode,
  Lang: LeaderboardRowLang,
});
