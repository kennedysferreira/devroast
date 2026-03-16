import Link from "next/link";
import { HomeOptionsRow } from "@/components/home-options-row";
import { LeaderboardRow } from "@/components/leaderboard-row";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";

const calculateTotalCode = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }
  // TODO: handle tax calculation
  // TODO: handle currency conversion
}`;

const leaderboardRows = [
  {
    rank: 1,
    score: "1.2",
    code: `eval(prompt("enter code"))\ndocument.write(response)\n// trust the user lol`,
    lang: "javascript",
  },
  {
    rank: 2,
    score: "1.8",
    code: `if (x == true) { return true; }\nelse if (x == false) { return false; }\nelse { return !false; }`,
    lang: "typescript",
  },
  {
    rank: 3,
    score: "2.1",
    code: `SELECT * FROM users WHERE 1=1\n-- TODO: add authentication`,
    lang: "sql",
  },
];

export default async function Home() {
  return (
    <main>
      <div className="max-w-[1120px] mx-auto px-10">
        {/* Hero */}
        <section className="py-20 text-center">
          <h1 className="font-mono text-[40px] font-bold leading-tight text-text-primary">
            <span className="text-accent-green">$</span> paste your code. get
            roasted.
          </h1>
          <p className="mt-3 font-mono text-sm text-text-tertiary">
            {
              "// drop your code below and we'll rate it — brutally honest or full roast mode"
            }
          </p>
        </section>

        {/* Code input panel */}
        <div className="max-w-[780px] mx-auto">
          <CodeBlock>
            <CodeBlock.Header filename="calculateTotal.js" />
            <CodeBlock.Content code={calculateTotalCode} lang="javascript" />
          </CodeBlock>
        </div>

        {/* Actions bar */}
        <div className="max-w-[780px] mx-auto mt-4">
          <HomeOptionsRow />
        </div>

        {/* Stats */}
        <p className="mt-3 font-mono text-xs text-text-tertiary text-center">
          2,847 codes roasted · avg score: 4.2/10
        </p>

        {/* Divider */}
        <div className="my-14 border-t border-border" />

        {/* Leaderboard */}
        <section className="max-w-[960px] mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-sm font-bold text-text-secondary">
              {"// shame_leaderboard"}
            </span>
            <Button variant="ghost" size="sm">
              $ view_all {">>"}
            </Button>
          </div>

          <p className="mb-6 font-mono text-xs text-text-tertiary">
            {"// the worst code on the internet, ranked by shame"}
          </p>

          {/* Table header */}
          <div className="grid grid-cols-[48px_72px_1fr_100px] gap-4 border-b border-border pb-2">
            <span className="font-mono text-xs text-text-tertiary">#</span>
            <span className="font-mono text-xs text-text-tertiary">score</span>
            <span className="font-mono text-xs text-text-tertiary">code</span>
            <span className="font-mono text-xs text-text-tertiary">lang</span>
          </div>

          {/* Table rows */}
          {leaderboardRows.map((row) => (
            <LeaderboardRow key={row.rank}>
              <LeaderboardRow.Rank>{row.rank}</LeaderboardRow.Rank>
              <LeaderboardRow.Score>{row.score}</LeaderboardRow.Score>
              <LeaderboardRow.Code>{row.code}</LeaderboardRow.Code>
              <LeaderboardRow.Lang>{row.lang}</LeaderboardRow.Lang>
            </LeaderboardRow>
          ))}

          <p className="mt-6 mb-20 font-mono text-center text-xs text-text-tertiary">
            showing top 3 of 2,847 ·{" "}
            <Link
              href="/leaderboard"
              className="hover:text-text-primary transition-colors"
            >
              view full leaderboard {">>"}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
