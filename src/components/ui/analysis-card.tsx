import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

function AnalysisCardRoot({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "border border-border p-5 flex flex-col gap-3",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function AnalysisCardHeader({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={twMerge("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

function AnalysisCardTitle({
  className,
  children,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={twMerge("text-text-primary font-mono text-[13px]", className)}
      {...props}
    >
      {children}
    </p>
  );
}

function AnalysisCardDescription({
  className,
  children,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      className={twMerge(
        "text-text-secondary font-sans text-xs leading-relaxed",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export const AnalysisCard = Object.assign(AnalysisCardRoot, {
  Header: AnalysisCardHeader,
  Title: AnalysisCardTitle,
  Description: AnalysisCardDescription,
});
