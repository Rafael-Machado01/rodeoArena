# 🐂 rodeoArena

Plataforma de gerenciamento e cronometragem oficial de rodeios profissionais: cadastro de competidores, animais e cidades, simulação de rounds com notas e ranking de desempenho.

## Stack

| Camada    | Tecnologia |
|-----------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19, Turbopack) |
| UI        | [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), [Base UI](https://base-ui.com) |
| ORM       | [Prisma 7](https://www.prisma.io) + PostgreSQL ([Supabase](https://supabase.com)) |
| Auth      | [Auth.js v5](https://authjs.dev) (beta) — GitHub e Google OAuth |
| Upload    | [EdgeStore](https://edgestore.dev) |
| Ícones    | [lucide-react](https://lucide.dev) |
| Validação | [Zod](https://zod.dev) |
| Pkg       | [pnpm](https://pnpm.io) |

## Estrutura

```
src/
├── app/
│   ├── api/auth/[...nextauth]/     # rota do Auth.js
│   ├── api/edgestore/[...edgestore]# uploads (EdgeStore)
│   ├── dashboard/                  # área autenticada (CRUDs)
│   └── page.tsx                    # home institucional
├── components/                     # componentes de UI
├── constants/                      # dados estáticos (conteúdo da home)
├── lib/                            # auth, prisma, utils
├── actions/                        # server actions (round, competitors, ...)
├── types/                          # FormState e tipos compartilhados
└── generated/prisma/               # client gerado (não versionado)
```

## Requisitos

- Node.js 20+.
- Banco PostgreSQL (local ou Supabase).
- Credenciais OAuth (GitHub/Google) e EdgeStore.

## Setup

Instale as dependências:

```bash
pnpm install
```

Configure o ambiente — copie o conteúdo de variáveis descritas abaixo para um arquivo `.env` na raiz:

```
DATABASE_URL="postgresql://USER:PASS@HOST:6543/db?pgbouncer=true"
DIRECT_URL="postgresql://USER:PASS@HOST:5432/db"

AUTH_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."

EDGE_STORE_ACCESS_KEY="..."
EDGE_STORE_SECRET_KEY="..."
```

> **Atenção:** nunca versionar o `.env`. Em produção, variáveis de ambiente recomendada: `DATABASE_URL`, `DIRECT_URL` (usada em migrações), `AUTH_SECRET` e as OAuth/EdgeStore.

Aplique as migrações e gere o client Prisma:

```bash
pnpm exec prisma migrate dev
pnpm exec prisma generate
```

Rode o seed (dados de exemplo — cidades, tipos de animal, animais, competidores e rounds):

```bash
pnpm exec tsx prisma/seed.ts
```

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando                 | Descrição |
|-------------------------|-----------|
| `pnpm dev`              | Servidor de desenvolvimento (Turbopack) |
| `pnpm build`            | Build de produção |
| `pnpm start`            | Serve o build |
| `pnpm lint`             | ESLint |
| `pnpm exec prisma migrate dev` | Aplica/gera migrações |
| `pnpm exec prisma generate`    | Regenera o client após mudanças no schema |
| `pnpm exec tsx prisma/seed.ts` | Popula o banco com dados de exemplo |

## Segurança & boas práticas

- Upload da EdgeStore exige sessão (`beforeUpload`) e só permite **deletar arquivos próprios** (`beforeDelete`), evitando arquivos órfãos.
- Rotas e actions de autenticação baseadas em sessão do Auth.js.

Rode `pnpm lint` (e `pnpm build`) antes de considerar mudanças concluídas.