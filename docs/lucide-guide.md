# Como usar a lucide-react

Já instalada no `package.json`. Ícones são componentes React que usam `currentColor`, ou seja, a cor vem do texto/`className`.

## 1. Importar o ícone

```tsx
import { Settings, Trophy, Calculator, LogOut } from "lucide-react"
```

## 2. Renderizar no lugar do `Image`

Antes:
```tsx
<Image src="/config.svg" alt="icone" width={20} height={20} />
```

Depois:
```tsx
<Settings size={20} />
```

## 3. Tamanho

- Prop `size={20}` (px fixo, default 24) — ou
- Classe Tailwind: `className="size-5"` (20px), `"w-6 h-6"`, etc.

## 4. Cor (ponto-chave para o tema)

Os SVGs atuais têm cor fixa hardcoded. Com lucide a cor é `currentColor`, então o tema funciona:

```tsx
<Settings className="text-rodeo-gold" />
<Settings className="text-text-muted hover:text-rodeo-gold" />
```

## 5. Outros props

- `strokeWidth={2}` → espessura do traço (default 2)
- `color="red"` → cor direta (rare — prefira `className`)
- Combinação: `<Settings size={20} strokeWidth={1.5} className="text-rodeo-gold" />`

## 6. `LucideProvider` (estilo global)

Aplica `color`, `size` e `strokeWidth` a todos os ícones filhos:

```tsx
import { LucideProvider, Home } from "lucide-react";

const App = () => (
  <LucideProvider color="red" size={48} strokeWidth={2}>
    <Home />
  </LucideProvider>
);
```

---

# Como criar constants com ícones

Guarde a **referência do componente** (não o JSX) e tipar com `LucideIcon`.

## 1. Na constant (`src/constants/...`)

```ts
import type { LucideIcon } from "lucide-react";
import { Trophy, Calculator, Settings } from "lucide-react";

interface WhatsCardsContentType {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WhatsCardsContent: WhatsCardsContentType[] = [
  { id: 1, icon: Trophy, title: "Ranking Inteligente", description: "..." },
  { id: 2, icon: Calculator, title: "Simulação Realista", description: "..." },
  { id: 3, icon: Settings, title: "Gestão Completa", description: "..." },
];
```

## 2. No componente

```tsx
{WhatsCardsContent.map((content) => (
  <content.icon className="size-6 text-rodeo-gold" />
))}
```

## Pontos-chave

- Guarde `icon: Trophy` (referência), **nunca** `<Trophy />` (renderizado).
- `LucideIcon` é o tipo global de qualquer ícone (`import type { LucideIcon } from "lucide-react"`).
- Cor/tamanho vem do `className` (`currentColor`) — ativa os tokens `text-rodeo-gold`, `hover:text-...`, etc.
- Dá para passar props na renderização: `<content.icon className="..." size={20} strokeWidth={1.5} />`.

---

# Mapeamento SVG atual → lucide-react

| SVG atual | Ícone lucide | Onde é usado |
|---|---|---|
| `config.svg` (engrenagem) | `Settings` | `LinkDashboard.tsx`, `CardUser.tsx` |
| `trophy.svg` | `Trophy` | `WhatsCardsContent` |
| `calc.svg` | `Calculator` | `WhatsCardsContent` |
| `logout.svg` | `LogOut` | `CardUser.tsx` |
| `github.svg` / `google.svg` | ❌ lucide não tem logotipos | manter `Image` (ou `react-icons`) |
| `rodeoLogo.svg` (chapéu, custom) | ❌ | manter `Image` |