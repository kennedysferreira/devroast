# UI Component Patterns

Padrões obrigatórios para todos os componentes de UI genéricos e reutilizáveis.

---

## Estrutura básica

```tsx
import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const component = tv({
  base: [...],
  variants: { ... },
  defaultVariants: { ... },
});

type ComponentVariants = VariantProps<typeof component>;
type ComponentProps = ComponentProps<"element"> & ComponentVariants;

export function Component({ variant, size, className, ...props }: ComponentProps) {
  return <element className={component({ variant, size, className })} {...props} />;
}
```

---

## Regras

### 1. Sempre use named exports
Componentes de UI nunca usam `default export`. Isso garante que o nome seja consistente em todo o codebase e facilita tree-shaking e refatorações.

```tsx
// ✅
export function Button() {}

// ❌
export default function Button() {}
```

### 2. Estenda as props nativas do elemento HTML
Use `ComponentProps<"element">` do React para herdar todos os atributos nativos (`onClick`, `disabled`, `type`, `aria-*`, etc.). Nunca redefina manualmente props que já existem no elemento nativo.

```tsx
// ✅
type ButtonProps = ComponentProps<"button"> & ButtonVariants;

// ❌
type ButtonProps = { onClick?: () => void; disabled?: boolean };
```

### 3. Merging de className: `tv()` para variantes, `twMerge` para componentes simples

Nunca use interpolação de string para unir className.

**Componentes com variantes** → passe `className` direto para `tv()` (que já integra tailwind-merge internamente):
```tsx
// ✅
className={button({ variant, size, className })}
```

**Componentes sem variantes** → use `twMerge` diretamente de `tailwind-merge`:
```tsx
// ✅
import { twMerge } from "tailwind-merge";
className={twMerge("base-classes...", className)}
```

**Proibido em qualquer caso:**
```tsx
// ❌ nunca interpolação de string
className={`base ${className ? ` ${className}` : ""}`}
// ❌ nunca twMerge manual em componente com variantes (tv() já faz isso)
className={twMerge(button({ variant, size }), className)}
```

### 4. Use apenas tokens do design system — nunca valores hardcoded
Cores e fontes devem vir exclusivamente dos tokens definidos no `@theme` do CSS. Isso garante consistência visual e facilita mudanças globais de tema.

```tsx
// ✅
"bg-accent-green text-page"
"bg-surface border-border text-text-primary"
"text-text-secondary"
"bg-accent-red"
"font-mono"

// ❌
"bg-emerald-500 text-[#0A0A0A]"
"bg-zinc-800 text-zinc-100"
```

### 5. Use classes canônicas do Tailwind — nunca `*-(--color-*)`
Quando existe uma classe utilitária Tailwind para um valor, use-a diretamente. A forma `*-(--color-*)` para cores padrão do Tailwind é desnecessária e o Biome (`suggestCanonicalClasses`) vai reportar como erro.

```tsx
// ✅
text-white, bg-black, text-transparent

// ❌
text-(--color-white), bg-(--color-black)
```

### 6. Arquivos de instrução devem ser UPPERCASE
Arquivos de regras para agentes de IA devem ter nome em letras maiúsculas: `CLAUDE.md`, `AGENTS.md`, `PATTERNS.md`. Nunca usar `claude.md`, `.clauderules`, `agents.md`, `cline_rules.md`.

### 7. Tokens disponíveis

| Token | Uso |
|---|---|
| `bg-page` | Fundo principal da página (`#0A0A0A`) |
| `bg-surface` | Cards e painéis (`#0F0F0F`) |
| `bg-input` | Fundo de inputs e code blocks (`#111111`) |
| `bg-elevated` | Elementos elevados, popovers (`#1A1A1A`) |
| `border-border` | Bordas e divisores (`#2A2A2A`) |
| `text-text-primary` | Texto principal (`#FAFAFA`) |
| `text-text-secondary` | Texto secundário (`#6B7280`) |
| `text-text-tertiary` | Texto desabilitado (`#4B5563`) |
| `bg-accent-green` / `text-accent-green` | Verde primário (`#10B981`) |
| `bg-accent-amber` / `text-accent-amber` | Amber para scores (`#F59E0B`) |
| `bg-accent-red` / `text-accent-red` | Vermelho para erros (`#EF4444`) |
| `text-code` | Highlight de código (`#FFC799`) |
| `bg-diff-removed` | Fundo de linha removida no diff |
| `bg-diff-added` | Fundo de linha adicionada no diff |
| `font-mono` | JetBrains Mono — UI, labels, código, elementos interativos |
| `font-sans` | Fonte do sistema — textos descritivos, corpo de texto longo |
| `var(--color-accent-green)` | Usado em SVG inline (ex: ScoreRing gradient) — não há classe Tailwind equivalente para `stroke`/`stop-color` |
| `var(--color-accent-amber)` | Idem — gradiente do arco do ScoreRing |
| `var(--color-border)` | Idem — `stroke` do anel externo do ScoreRing |

### 8. Composition pattern — sub-componentes via dot notation

Use quando o componente possui seções semânticas nomeadas distintas (header, title, body, description).

**Quando usar:** componentes com 2+ partes nomeadas que o consumer quer controlar individualmente.
**Quando não usar:** componentes atômicos (`Badge`, `Button`, `Toggle`) ou data-driven (`Diff`, `ScoreRing`).

Implementação via `Object.assign` — continua sendo named export:

```tsx
// ✅
function FooRoot(...) { ... }
function FooTitle(...) { ... }
export const Foo = Object.assign(FooRoot, { Title: FooTitle })

// uso
<Foo>
  <Foo.Title>...</Foo.Title>
</Foo>
```
