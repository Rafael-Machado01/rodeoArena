import { initEdgeStore } from "@edgestore/server";
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app";
import { auth } from "@/lib/auth";

type Context = {
  userId: string | null;
};

async function createContext(): Promise<Context> {
  const session = await auth(); // sua sessão já existente
  return { userId: session?.user?.id ?? null };
}

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket()
    // 🔒 bloqueia upload anônimo (o buraco de segurança do review)
    .beforeUpload(({ ctx }) => {
      return ctx.userId !== null;
    })
    // organiza por autor: /publicFiles/{userId}/...
    .path(({ ctx }) => [{ author: ctx.userId! }])
    // necessário se quiser deletar arquivos pelo client
    // (útil pro problema dos arquivos órfãos: troca de avatar/capa)
    .beforeDelete(({ ctx, fileInfo }) => {
      return fileInfo.path.author === ctx.userId; // só apaga o que é dele
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;
