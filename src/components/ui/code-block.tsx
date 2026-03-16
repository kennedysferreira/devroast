import type { ComponentProps } from "react";
import { codeToHtml } from "shiki";
import { twMerge } from "tailwind-merge";

function CodeBlockRoot({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={twMerge(
        "bg-input border border-border overflow-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CodeBlockHeader({ filename }: { filename?: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
      <div className="flex gap-1.5">
        <span className="size-3 rounded-full bg-accent-red" />
        <span className="size-3 rounded-full bg-accent-amber" />
        <span className="size-3 rounded-full bg-accent-green" />
      </div>
      {filename && (
        <span className="text-text-tertiary text-xs font-mono">{filename}</span>
      )}
    </div>
  );
}

async function CodeBlockContent({
  code,
  lang,
}: {
  code: string;
  lang: string;
}) {
  const html = await codeToHtml(code, { lang, theme: "vesper" });
  return (
    <div
      className="p-4 overflow-x-auto [&_.shiki]:bg-transparent!"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export const CodeBlock = Object.assign(CodeBlockRoot, {
  Header: CodeBlockHeader,
  Content: CodeBlockContent,
});
