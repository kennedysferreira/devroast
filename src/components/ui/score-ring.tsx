import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const SIZE = 180;
const STROKE = 4;
const R = (SIZE - STROKE) / 2;
const CX = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

interface ScoreRingProps extends ComponentProps<"div"> {
  score: number; // 0–10
}

export function ScoreRing({ score, className, ...props }: ScoreRingProps) {
  const clamped = Math.min(Math.max(score, 0), 10);
  const arc = CIRCUMFERENCE * (clamped / 10);

  return (
    <div
      className={twMerge(
        "relative inline-flex size-[180px] items-center justify-center font-mono",
        className,
      )}
      {...props}
    >
      <svg
        width={SIZE}
        height={SIZE}
        className="absolute inset-0 -rotate-90"
        aria-hidden={true}
      >
        <defs>
          <linearGradient id="score-ring-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-accent-green)" />
            <stop offset="100%" stopColor="var(--color-accent-amber)" />
          </linearGradient>
        </defs>
        <circle
          cx={CX}
          cy={CX}
          r={R}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={STROKE}
        />
        {clamped > 0 && (
          <circle
            cx={CX}
            cy={CX}
            r={R}
            fill="none"
            stroke="url(#score-ring-grad)"
            strokeWidth={STROKE}
            strokeDasharray={`${arc} ${CIRCUMFERENCE}`}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="flex items-baseline gap-0.5">
        <span className="text-[48px] font-bold leading-none text-text-primary">
          {clamped}
        </span>
        <span className="text-base leading-none text-text-tertiary">/10</span>
      </div>
    </div>
  );
}
