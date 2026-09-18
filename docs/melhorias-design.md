# Melhorias de design — Card de competidor, vitórias e tema rodeo

Data: terça-feira, 15/09/2026

Fonte: comentário de revisão no **PR #7** (`feat/competitors-crud-refactor`), seção **"🎨 Ideias de melhoria de design"**. Esta sessão aplicou os itens **1, 6 e 7**; os demais ficaram registrados como pendências no final.

## 1. Item 1 — Redesign do card de competidor (aplicado)

**Problema:** o `DataCompetitor` usava um `Card` com layout confuso — 3 pivôs soltos dentro do `CardContent` (Vitórias / Rounds / Ações com o botão no meio das stats) e o header montado dentro do `CardContent`.

**Solução aplicada em `src/components/ui/dashboard/competitors/DataCompetitor.tsx`:**

- Header com avatar + nome + cidade e chip de contagem:
  - Avatar por imagem (`Image` `size-11 rounded-full object-cover`) ou **fallback com inicial** do nome em círculo `bg-rodeo-gold/20 text-rodeo-gold` (mesmo padrão do `DataAnimal`).
  - Linha de cidade com UF via `competitors.cidade.estado?.descricao`.
  - Chip de contagem "X animais montados" (contagem de animais distintos via `new Set(rounds.map(r => r.animalId)).size`).
- Ações movidas para o **canto superior direito** do card usando o slot `CardAction` do shadcn (`has-data-[slot=card-action]:grid-cols-[1fr_auto]`) — padrão de cards de perfil do shadcn.
- Corpo com stats em **2 colunas uniformes** (`grid grid-cols-2 gap-3`), cada bloco `bg-rodeo-bg rounded-lg p-3`.

## 2. Item 7 — Vitórias em destaque + bug de Rounds (aplicado)

**Bugs corrigidos:**

1. O card `Rounds` exibia `competitors.vitorias` (copy-paste da linha de Vitórias).
2. A query `getAllCompetitors()` nem trazia os rounds.

**Solução aplicada:**

- `src/actions/Competitor.ts` — `getAllCompetitors()` incluiu `rounds: { select: { animalId: true } }` (e `cidade: { include: { estado: true } }` para a UF no card).
- `DataCompetitor.tsx` — stats com **números grandes (`text-3xl font-bold`)** e rótulo abaixo (`text-sm text-text-muted`), estilo dashboard esportivo:
  - `Vitórias` → `competitors.vitorias`
  - `Rounds` → `competitors.rounds.length`

**Type Prisma usado:**

```ts
type CompetitorsWithRounds = Prisma.CompetidorGetPayload<{
  include: {
    cidade: { include: { estado: true } };
    rounds: { select: { animalId: true } };
  };
}>;
```

## 3. Item 6 — Tema rodeo nos focos e hover (aplicado)

**Problema:** os cards já usavam `ring-rodeo-gold/25`, mas inputs e dropdowns usavam tons neutros (`ring-ring/50`) e bronze (`bg-rodeo-bronze/20`), quebrando a consistência de tema.

**Solução aplicada — tom `rodeo-gold/25` em todos os focos de input e hover de dropdown:**

| Arquivo | Mudança |
|---|---|
| `src/components/ui/input.tsx` | `focus-visible:border-rodeo-gold focus-visible:ring-3 focus-visible:ring-rodeo-gold/25` |
| `src/components/ui/select.tsx` (trigger) | mesmo foco dourado do input |
| `src/components/ui/select.tsx` (item) | `hover:bg-rodeo-gold/25 focus:bg-rodeo-gold/25` |
| `src/components/ui/dropdown-menu.tsx` (Item, SubTrigger, CheckboxItem, RadioItem) | `hover:bg-rodeo-gold/25 focus:bg-rodeo-gold/25` (e `data-popup-open`/`data-open` no subtrigger) |

## 4. Pendências não aplicadas (ideias da revisão)

Registradas para próximos PRs, ainda **não** implementadas:

| # | Ideia | Detalhe |
|---|---|---|
| 2 | Empty state | Quando não há animais/competidores, mostrar estado vazio temático (ícone + "Nenhum {item} cadastrado" + botão "Adicionar primeiro"). Hoje é uma tabela/grid vazia silenciosa. |
| 3 | Componente `Avatar`/fallback | `EditProfile.tsx` e `EditAnimal.tsx` mostram `""` ou `"Ola"` sem imagem. Criar componente `Avatar` com iniciais (padrão já usado no `DataAnimal`/`DataCompetitor`) e reutilizar em tudo. |
| 4 | Feedback de loading | `DeleteCard`, `EditCard` (futuro) e `UploadImage`: disabled no botão durante a ação + spinner; no upload, progresso/placeholder enquanto envia. |
| 5 | Inputs com controle | Nos forms em dialog (`NewAnimal`, `NewCompetitor`), campos `imageUrl`/`tipoAnimalId`/`cidadeId` usam hidden inputs controlados por `useState`; acoplar ao `useActionState` (via `useFormStatus`) quando o `EditCard` genérico for feito. |

## 5. Verificações

| Comando | Resultado |
|---|---|
| `pnpm lint` | ✅ 0 erros |
| `npx tsc --noEmit` | ⚠️ erros **pré-existentes** em arquivos do refactor em andamento (fora do escopo): `DataAnimal.tsx` (import `@/types/TipoAnimal` inexistente), `EditCity/NewCity/NewCompetitor.tsx` (`SetStateAction<string | null>`), `page.tsx` (prop `EditCity`) |

## 6. Observações da sessão

- `prisma generate` foi executado: o client gerado estava desatualizado em relação ao schema (modelos `Estado`/`Cidade`), o que fazia a tipagem do `DataCompetitor` não enxergar a relação `estado`.
- `EditAnimal.tsx` estava com um string literal não fechado na linha 10 (refactor em andamento); só a string foi fechada e os imports ordenados via autofix do lint para o projeto voltar a passar no lint — o restante do refactor segue pendente do autor.