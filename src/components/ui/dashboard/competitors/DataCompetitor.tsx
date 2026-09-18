import Image from "next/image";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import ActionsCompetidor from "@/components/ui/dashboard/competitors/ActionsCompetitor";
import type { Prisma } from "@/generated/prisma/client";
import SelectOptionType from "@/types/SelectOptionType";

type CompetitorsWithRounds = Prisma.CompetidorGetPayload<{
  include: {
    cidade: { include: { estado: true } };
    rounds: { select: { animalId: true } };
  };
}>;

interface DataCompetitorProps {
  competitors: CompetitorsWithRounds;
  citys: SelectOptionType[];
}

export default function DataCompetitor({
  competitors,
  citys,
}: DataCompetitorProps) {
  const totalRounds = competitors.rounds.length;
  const totalAnimais = new Set(competitors.rounds.map((r) => r.animalId)).size;

  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex items-center gap-3">
          {competitors.imageUrl ? (
            <Image
              src={competitors.imageUrl}
              alt={`Imagem de perfil de ${competitors.nome}`}
              width={46}
              height={46}
              className="size-11 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-rodeo-gold/20 font-heading text-lg font-semibold text-rodeo-gold">
              {competitors.nome.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <h2 className="truncate font-heading text-base font-semibold text-text">
              {competitors.nome}
            </h2>
            <p className="truncate text-sm text-text-muted">
              {competitors.cidade.descricao}{" "}
              {competitors.cidade.estado?.descricao}
            </p>
            <span className="mt-1 inline-flex items-center rounded-full bg-rodeo-gold/15 px-2 py-0.5 text-xs font-medium text-rodeo-gold">
              {totalAnimais}{" "}
              {totalAnimais === 1 ? "animal montado" : "animais montados"}
            </span>
          </div>
        </div>
        <CardAction>
          <ActionsCompetidor
            id={competitors.id}
            competidor={competitors}
            citys={citys}
          />
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-lg bg-rodeo-bg p-3">
            <span className="text-3xl font-bold text-text">
              {competitors.vitorias}
            </span>
            <span className="mt-1 text-sm text-text-muted">Vitórias</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-rodeo-bg p-3">
            <span className="text-3xl font-bold text-text">{totalRounds}</span>
            <span className="mt-1 text-sm text-text-muted">Rounds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
