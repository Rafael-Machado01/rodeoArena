# Tipos Prisma vs Tipos Manuais

## Regra geral

Usar os tipos gerados pelo Prisma Client (`src/generated/prisma`) em vez de declarar interfaces manuais para dados que vêm do banco.

Tipos manuais ficam desatualizados e causam conflitos quando o schema muda.

## Quando usar o tipo do Prisma

- Queries / actions (`findMany`, `findUnique`, etc.)
- Props que recebem dados direto do banco

Importação:

```ts
import type { Animal } from "@/generated/prisma/models/Animal";
```

## Quando a query tem `include`

Se a query usa `include: { tipoAnimal: true }`, o tipo base do model não reflete a relação. Usar `Prisma.AnimalGetPayload`:

```ts
import type { Prisma } from "@/generated/prisma";

type AnimalComTipo = Prisma.AnimalGetPayload<{
  include: { tipoAnimal: true }
}>;
```

## Quando vale um tipo manual

Quando o dado é formatado para a UI e não corresponde 1:1 ao schema do banco. Ex.: mapear para `label`/`value` em um select.

Nesse caso, declarar um tipo específico para aquele formato — não replique o schema.
