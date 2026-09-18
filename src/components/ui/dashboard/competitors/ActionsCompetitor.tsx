"use client";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

import { deleteCompetitor } from "@/actions/Competitor";
import { Button } from "@/components/ui/button";
import DeleteCard from "@/components/ui/crud/DeleteCard";
import EditCompetitors from "@/components/ui/dashboard/competitors/EditComptetitors";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Prisma } from "@/generated/prisma/client";
import SelectOptionType from "@/types/SelectOptionType";

type CompetitorsWithRounds = Prisma.CompetidorGetPayload<{
  include: {
    cidade: { include: { estado: true } };
    rounds: { select: { animalId: true } };
  };
}>;

interface ActionsCompetidorProps {
  competidor: CompetitorsWithRounds;
  citys: SelectOptionType[];
  id: string;
}

export default function ActionsCompetidor({
  id,
  citys,
  competidor,
}: ActionsCompetidorProps) {
  const [open, setOpen] = useState(false);
  const [targetEdit, setTargetEdit] = useState("");
  return (
    <div className="flex flex-col items-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontalIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTargetEdit(competidor.id)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)} variant="destructive">
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCard
        id={id}
        open={open}
        onClose={() => setOpen(!open)}
        table="Competidor"
        action={() => deleteCompetitor(id)}
      />
      <EditCompetitors
        open={targetEdit === competidor.id}
        onClose={() => setTargetEdit("")}
        citys={citys}
        competidor={competidor}
      />
    </div>
  );
}
