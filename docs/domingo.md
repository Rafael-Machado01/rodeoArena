# Domingo — Limpeza de Imports (Alias) e Types Prisma

Data: domingo, 13/09/2026

## 1. Contexto e objetivo

- Padronizar **todos** os imports do projeto usando o alias `@/*` (já configurado no `tsconfig.json` como `@/*` → `./src/*`).
- Adicionar regra de lint que **ordena** imports automaticamente e impede que se baguncem no futuro.
- Substituir **types manuais duplicados** pelos types gerados do Prisma (`src/generated/prisma`).
- Relatar se ainda há necessidade de types manuais.

## 2. Configuração de aliases

O alias já existia no `tsconfig.json`:

```json
"paths": {
  "@/*": ["./src/*"]
}
```

O que faltava era **forçar o uso** no código. Havia 14 imports relativos (`../`, `../../` e `./`) que escapavam do padrão.

## 3. Lint: ordenação e padronização de imports

### Plugin instalado

- **`eslint-plugin-simple-import-sort@14`** (dev dependency) — leve, compatível com ESLint flat config.

### `eslint.config.mjs` (alterado)

```js
import simpleImportSort from "eslint-plugin-simple-import-sort";

// dentro do defineConfig:
{
  plugins: {
    "simple-import-sort": simpleImportSort,
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
}
```

Além disso, `src/generated/**` foi adicionado aos **ignores** do ESLint (código gerado não deve ser ordenado/editado pelo lint).

### Como funciona

O `simple-import-sort` organiza os imports em grupos na seguinte ordem:

1. Side effects (`import "./x"`)
2. Módulos do Node (`node:...`)
3. Pacotes externos (ex.: `next`, `react`, `lucide-react`) — em ordem alfabética
4. Imports absolutos/alias (ex.: `@/components/...`) — em ordem alfabética
5. Imports relativos (`./...`, `../...`)

**Importante:** a regra apenas **ordena**; ela não converte caminhos relativos em alias. A conversão dos caminhos foi feita manualmente nesta sessão.

### Como rodar

```bash
pnpm lint              # verifica
pnpm lint -- --fix     # ainda funciona se passar --fix direto
pnpm exec eslint . --fix   # ou assim, para corrigir automaticamente
```

## 4. Imports relativos convertidos para `@/`

### De `../button` / `../../button` → `@/components/ui/button`

| Arquivo | Antes |
|---|---|
| `src/components/ui/home/NavBar.tsx` | `"../button"` |
| `src/components/ui/dashboard/LinkDashboard.tsx` | `"../button"` |
| `src/components/ui/dashboard/animals/DeleteAnimal.tsx` | `"../../button"` |
| `src/components/ui/dashboard/competitors/DeleteCompetitor.tsx` | `"../../button"` |

### De `../../card` → `@/components/ui/card`

- `src/components/ui/dashboard/competitors/DataCompetitor.tsx`

### De `../../toast` → `@/components/ui/toast`

- `src/components/ui/dashboard/animals/NewAnimal.tsx`
- `src/components/ui/dashboard/animals/EditAnimal.tsx`
- `src/components/ui/dashboard/competitors/NewCompetitor.tsx`

### De `./` (mesmo diretório) → alias completo

- `src/components/ui/dashboard/animals/DataAnimal.tsx` → `DeleteAnimal`, `EditAnimal`
- `src/components/ui/dashboard/animals/NewAnimal.tsx` → `SelectTipoAnimal`
- `src/components/ui/dashboard/animals/EditAnimal.tsx` → `SelectTipoAnimal`
- `src/components/ui/dashboard/competitors/DataCompetitor.tsx` → `ActionsCompetitor`
- `src/components/ui/dashboard/competitors/NewCompetitor.tsx` → `SelectCitys`
- `src/components/ui/dashboard/competitors/ActionsCompetitor.tsx` → `DeleteCompetitor`

**Observação:** `./globals.css` e `./fonts` no `layout.tsx` foram **mantidos como relativos** de propósito (CSS não resolve alias `@/` e segue a convenção de co-localização com o layout).

## 5. Types manuais substituídos pelos do Prisma

O Prisma 7 gera os types em `src/generated/prisma/` (não versionado) e exporta `User`, `Animal`, `Competidor`, `TipoAnimal`, `Cidade`, etc. O tipo padrão de cada modelo (default selection) está disponível em `@/generated/prisma/client` (server) e `@/generated/prisma/browser` (client).

### `src/types/User.ts` — **deletado**

Duplicava exatamente o modelo `User` do Prisma. Substituído por:

```ts
import type { User } from "@/generated/prisma/browser";
```

Arquivos atualizados:
- `src/components/ui/dashboard/AppSidebar.tsx` (alias `userType`)
- `src/components/ui/dashboard/CardUser.tsx` (alias `UserType`)
- `src/components/ui/dashboard/EditProfile.tsx` (alias `UserType`)

### `src/types/Animal.ts` — **deletado**

Duplicava o modelo `Animal` de forma **incorreta** (o Prisma tem `tipoAnimal: TipoAnimal` como relação e `rounds: Round[]`; o manual tinha `tipoAnimal: string` e `rounds: []`). Nenhum arquivo o usava — era código morto.

### `src/types/Competitors.ts` — **deletado**

Duplicava o modelo `Competidor` com divergência (`imageUrl` deveria ser opcional, `String?`). Nenhum arquivo o usava — era código morto.

### `src/types/TipoAnimal.ts` — **corrigido**

Tinha **dois `export default` no mesmo arquivo** (inválido) — `TipoAnimal` (duplicado do Prisma) e `TipoAnimalOption`. O `TipoAnimal` foi removido; ficou só a opção de dropdown:

```ts
export default interface TipoAnimalOption {
  label: string;
  value: string;
}
```

### Erro de import corrigido

`src/components/ui/dashboard/animals/DataAnimal.tsx` importava `@/generated/prisma` (módulo inexistente — quebrava o typecheck). Corrigido para `@/generated/prisma/browser`.

## 6. Há necessidade de types manuais? **Sim, mas poucos.**

**Mantidos em `src/types/` (necessários, não existem no Prisma):**

| Arquivo | Motivo |
|---|---|
| `FormState.ts` | Estado de retorno de server actions (`{ message, type: "success" \| "error" }`). Não é um modelo de dados. |
| `CidadeOption.ts` | Shape de dropdown (`{ label, value }`) que alimenta `SelectCitys`. Deriva de `Cidade` na página, mas como shape de UI não faz sentido forçar um tipo Prisma. |
| `TipoAnimalOption.ts` | Idem, para `SelectTipoAnimal`/`NewAnimal`. |

**Conclusão:** os types de **domínio** (que espelham tabelas — `User`, `Animal`, `Competidor`, `TipoAnimal`) devem SEMPRE vir do Prisma gerado. Permanecem manuais apenas os types de **UI/estado** (`FormState`) e **shapes de dropdown** (`*Option`), que não têm equivalente no banco.

## 7. Correções de tipos encontradas no caminho (pré-existentes)

Enquanto caçava types manuais, encontrei e corrigi problemas reais de tipo/estrutura:

| Arquivo | Problema | Correção |
|---|---|---|
| `DeleteCompetitor.tsx` | Interface chamada `DeleteAnimalProps` (erro de copy/paste) | Renomeada para `DeleteCompetitorProps` |
| `DeleteCard.tsx` | Referenciava `DeleteCardProps` **inexistente** (arquivo quebrado) e usava `id` fora do escopo | Interface `DeleteCardProps` declarada e prop `id: string` adicionada |
| `NewCompetitor.tsx` | Prop `citys` tipada como `CidadeOption` (singular) mas recebia um array | Corrigida para `CidadeOption[]` |
| `SelectCitys.tsx` | `onChanged: () => void` não recebia o valor | Corrigida para `(value: string \| null) => void` (compatível com o Select/uso) |
| `ActionsCompetitor.tsx` | Usava `asChild` (não existe no Base UI — usa `render`), `openDelete` indefinido, `DeleteCompetitor` sem props, `DropdownMenu` aninhado indevidamente | Componente reescrito com estado local (`useState`) e diretiva `"use client"`; `DataCompetitor` agora passa `id` |
| `src/actions/Competitor.ts` | `cidadeId` sem cast (`FormDataEntryValue` ≠ `string`) | Adicionado `as string` |

## 8. Verificações

| Comando | Resultado |
|---|---|
| `pnpm lint` | ✅ 0 erros, 0 warnings |
| `npx tsc --noEmit` | ✅ sem erros |
| `pnpm build` | ✅ build de produção concluído (8 rotas) |

## 9. Observações finais / pendências fora do escopo

- `prisma generate` não precisou ser executado (schema inalterado).
- Os arquivos do feature de competidores (`src/actions/Competitor.ts`, `src/components/ui/dashboard/competitors/`, etc.) estavam **untracked** no git antes desta sessão — não parecem ter sido commitados ainda.
- O padrão `Prisma.XGetPayload<{ include: {...} }>` já era usado corretamente em `DataAnimal.tsx`, `EditAnimal.tsx` e `DataCompetitor.tsx`.