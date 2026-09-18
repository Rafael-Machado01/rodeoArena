"use client";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { deleteRound } from "@/actions/round";
import EditRound from "@/app/dashboard/rounds/EditRound";
import { Button } from "@/components/ui/button";
import DeleteCard from "@/components/ui/crud/DeleteCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Prisma } from "@/generated/prisma/browser";
import type SelectOptionType from "@/types/SelectOptionType";

type RoundWithRelations = Prisma.RoundGetPayload<{
  include: { animal: { include: { tipoAnimal: true } }; competidor: true };
}>;

interface DataRoundProps {
  rounds: RoundWithRelations[];
  animals: SelectOptionType[];
  competitors: SelectOptionType[];
}

export default function DataRound({
  rounds,
  animals,
  competitors,
}: DataRoundProps) {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<string | null>(null);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Animal</TableHead>
          <TableHead>Competidor</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Nota Animal</TableHead>
          <TableHead>Nota Competidor</TableHead>
          <TableHead>Penalidade</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rounds.map((round) => (
          <TableRow key={round.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-3">
                {round.animal.imageUrl ? (
                  <Image
                    src={round.animal.imageUrl}
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-full object-cover"
                    alt={`Foto do animal: ${round.animal.nome}`}
                  />
                ) : (
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/30 font-heading text-base font-semibold text-text-muted">
                    {round.animal.nome.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span>
                  {round.animal.nome} [{round.animal.tipoAnimal.descricao}]
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                {round.competidor.imageUrl ? (
                  <Image
                    src={round.competidor.imageUrl}
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-full object-cover"
                    alt={`Foto do competidor: ${round.competidor.nome}`}
                  />
                ) : (
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rodeo-gold/20 font-heading text-base font-semibold text-rodeo-gold">
                    {round.competidor.nome.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span>{round.competidor.nome}</span>
              </div>
            </TableCell>
            <TableCell>{round.data}</TableCell>
            <TableCell>{round.notaAnimal}</TableCell>
            <TableCell>{round.notaCompetidor}</TableCell>
            <TableCell>{round.penalidade}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  }
                />
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setEditTarget(round.id)}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setDeleteTarget(round.id)}
                  >
                    Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteCard
                id={round.id}
                open={deleteTarget === round.id}
                onClose={() => setDeleteTarget(null)}
                table="Round"
                action={() => deleteRound(round.id)}
              />
              <EditRound
                open={editTarget === round.id}
                onClose={() => setEditTarget(null)}
                round={round}
                animals={animals}
                competitors={competitors}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}