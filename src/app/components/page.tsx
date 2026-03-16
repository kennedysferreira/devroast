import { AnalysisCard } from "@/components/ui/analysis-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { Diff } from "@/components/ui/diff";
import { ScoreRing } from "@/components/ui/score-ring";
import { Toggle } from "@/components/ui/toggle";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-accent-green font-bold">{"//"}</span>
        <h2 className="text-text-primary font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default async function ComponentsPage() {
  return (
    <main className="min-h-screen bg-page px-20 py-16 flex flex-col gap-16">
      <div className="flex items-center gap-2">
        <span className="text-accent-green font-bold text-2xl">{"//"}</span>
        <h1 className="text-text-primary font-bold text-2xl">
          component_library
        </h1>
      </div>

      {/* Button */}
      <Section title="button / variant">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="outline">outline</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="destructive">destructive</Button>
        </div>
      </Section>

      <Section title="button / size">
        <div className="flex flex-wrap items-end gap-4">
          <Button size="sm">size_sm</Button>
          <Button size="md">size_md</Button>
          <Button size="lg">size_lg</Button>
        </div>
      </Section>

      <Section title="button / disabled">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" disabled>
            primary
          </Button>
          <Button variant="secondary" disabled>
            secondary
          </Button>
          <Button variant="outline" disabled>
            outline
          </Button>
          <Button variant="ghost" disabled>
            ghost
          </Button>
          <Button variant="destructive" disabled>
            destructive
          </Button>
        </div>
      </Section>

      {/* Badge */}
      <Section title="badge / variant">
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="critical">critical</Badge>
          <Badge variant="warning">warning</Badge>
          <Badge variant="todo">todo</Badge>
          <Badge variant="info">info</Badge>
        </div>
      </Section>

      {/* Toggle */}
      <Section title="toggle">
        <div className="flex flex-wrap items-center gap-6">
          <Toggle />
          <Toggle defaultChecked />
          <Toggle disabled />
          <Toggle defaultChecked disabled />
        </div>
      </Section>

      {/* AnalysisCard */}
      <Section title="card">
        <AnalysisCard>
          <AnalysisCard.Header>
            <Badge variant="critical">critical</Badge>
          </AnalysisCard.Header>
          <AnalysisCard.Title>
            using var instead of const/let
          </AnalysisCard.Title>
          <AnalysisCard.Description>
            the var keyword is function-scoped rather than block-scoped, which
            can cause unexpected behavior when used inside loops or
            conditionals.
          </AnalysisCard.Description>
        </AnalysisCard>
      </Section>

      {/* ScoreRing */}
      <Section title="score_ring">
        <div className="flex flex-wrap items-center gap-8">
          <ScoreRing score={3.5} />
          <ScoreRing score={7} />
          <ScoreRing score={10} />
        </div>
      </Section>

      {/* CodeBlock */}
      <Section title="code_block">
        <CodeBlock>
          <CodeBlock.Header filename="hello.ts" />
          <CodeBlock.Content
            lang="typescript"
            code={`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("devroast"));`}
          />
        </CodeBlock>
      </Section>

      {/* Diff */}
      <Section title="diff">
        <Diff
          lines={[
            { type: "context", content: "import { useState } from 'react';" },
            {
              type: "removed",
              content: "const [count, setCount] = useState(0);",
            },
            {
              type: "added",
              content: "const [count, setCount] = useState(42);",
            },
            { type: "context", content: "" },
            { type: "context", content: "return <div>{count}</div>;" },
          ]}
        />
      </Section>
    </main>
  );
}
