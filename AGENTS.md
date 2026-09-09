# AGENTS.md

## Contexto do projeto

Plataforma de gerenciamento e cronometragem oficial de rodeios profissionais.

- **Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Prisma 7 (PostgreSQL), NextAuth v5 (beta), Base UI + shadcn/ui, pnpm.
- **Client Prisma:** gerado em `src/generated/prisma` (não versionado). Sempre rodar `prisma generate` após alterar `prisma/schema.prisma`.
- **Auth:** configurada em `src/auth.ts`; rota em `src/app/api/auth/[...nextauth]/route.ts`.
- **Tema/cores:** tokens customizados em `globals.css` ex.: `rodeo-bg`, `rodeo-bronze`, `rodeo-gold`.

## Regra principal

**NUNCA entregue código** (snippets, arquivos, classes CSS, etc.). Sempre apenas **explique** o problema, a causa e a solução em palavras. O usuário solicitará explicitamente se quiser que algum código seja escrito/alterado.

## Idioma

Responda sempre em **português (PT-BR)**.

## Limites

- Não crie arquivos ou documentação novos (README, docs, etc.) sem permissão explícita.
- Não edite código sem o usuário pedir (apenas explicações por padrão).
- Verifique com `npm run lint` (e `npm run build` quando relevante) antes de dar tarefas por concluídas.

## Comandos

```bash
pnpm dev        # servidor de desenvolvimento
pnpm build      # build de produção
pnpm start      # serve o build
pnpm lint       # eslint
npx prisma generate    # regenera o client após mudar o schema
npx prisma migrate dev # aplica/gera migrações
```

## MCPs conectados — usar sempre que fizer sentido

- **context7** — documentação atualizada de bibliotecas/frameworks (Next.js, Prisma, Tailwind, NextAuth...). Consultar antes de afirmar como algo funciona.
- **github** — issues, PRs, commits e busca de código no GitHub.
- **playwright** — automação/inspeção de navegador (testar visualmente páginas, verificar CSS renderizado). Ver `~/.config/opencode/playwright-mcp.config.json` (usa Chromium, não o Chrome do sistema).
- **filesystem** — leitura/escrita de arquivos fora do fluxo padrão (ex.: explorar diretórios).
- **sequential-thinking** — raciocínio passo a passo para problemas complexos.

Prefira usar os MCPs acima (principalmente context7 e playwright) em vez de responder só por conhecimento de treino.