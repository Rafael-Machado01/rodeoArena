import { User } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ActionsCompetidor from "@/components/ui/dashboard/competitors/ActionsCompetitor";
import { TailwindData } from "@/constants/TailwindData";
import type { Prisma } from "@/generated/prisma/client";

type CompetitorsWithCity = Prisma.CompetidorGetPayload<{
  include: { cidade: true };
}>;

interface DataCompetitorProps {
  competitors: CompetitorsWithCity;
}
export default function DataCompetitor({ competitors }: DataCompetitorProps) {
  return (
    <Card>
      <CardContent>
        <CardHeader className="flex mb-2 border border-rodeo-surface border-b-text-muted/20">
          {competitors.imageUrl ? (
            <Image
              src={competitors.imageUrl}
              alt={`Imagem de perfil de ${competitors.nome}`}
              width={46}
              height={46}
              className="rounded-full mb-2"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rodeo-surface text-text-muted">
              <User size={36} />
            </div>
          )}
          <div className="ml-2">
            <h2 className="font-semibold text-text text-base">
              {competitors.nome}
            </h2>
            <p className="text-text-muted mb-1">
              {competitors.cidade.descricao} {competitors.cidade.estado}
            </p>
          </div>
        </CardHeader>
        <div className={`${TailwindData.centered} gap-4`}>
          <div className="p-2 bg-rodeo-bg rounded-md">
            <p className="text-base font-bold">{competitors.vitorias}</p>
            <p>Vitórias</p>
          </div>
          <div className="p-2 bg-rodeo-bg rounded-md">
            <p className="text-base font-bold">{competitors.vitorias}</p>
            <p>Rounds</p>
          </div>
          <div className="p-2 bg-rodeo-bg rounded-md cursor-pointer flex flex-col items-center justify-center">
            <ActionsCompetidor id={competitors.id} />
            <p>Ações</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
