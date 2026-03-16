import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-border">
      <div className="flex h-14 items-center justify-between px-10">
        <Link
          href="/"
          className="font-mono font-bold text-sm text-text-primary"
        >
          <span className="text-accent-green">{">"}</span> devroast
        </Link>
        <Link
          href="/leaderboard"
          className="font-mono text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          leaderboard
        </Link>
      </div>
    </header>
  );
}
