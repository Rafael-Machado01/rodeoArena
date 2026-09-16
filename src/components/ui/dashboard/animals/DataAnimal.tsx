"use client";
import { MoreHorizontalIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { deleteAnimal } from "@/actions/animals";
import { Button } from "@/components/ui/button";
import DeleteCard from "@/components/ui/crud/DeleteCard";
import EditAnimal from "@/components/ui/dashboard/animals/EditAnimal";
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
import { TailwindData } from "@/constants/TailwindData";
import type { Prisma } from "@/generated/prisma/browser";
import SelectOptionType from "@/types/SelectOptionType";
type AnimalWithTipo = Prisma.AnimalGetPayload<{
  include: { tipoAnimal: true };
}>;

interface DataAnimalProps {
  animais: AnimalWithTipo[];
  tipoAnimal: SelectOptionType[];
}

export function DataAnimal({ animais, tipoAnimal }: DataAnimalProps) {
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<string | null>(null);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imagem</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Tipo Animal</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {animais.map((animal) => (
          <TableRow key={animal.id}>
            <TableCell className={TailwindData.centered}>
              {animal.imageUrl ? (
                <Image
                  src={animal.imageUrl}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full"
                  alt={`Foto do animal: ${animal.nome}`}
                />
              ) : (
                <p className="rounded-full bg-black/30 px-2 text-lg text-text-muted">
                  {animal.nome.slice(0, 1).toUpperCase()}
                </p>
              )}
            </TableCell>
            <TableCell className="font-medium">{animal.nome}</TableCell>
            <TableCell>{animal.tipoAnimal.descricao}</TableCell>
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
                  <DropdownMenuItem onClick={() => setEditTarget(animal.id)}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setDeleteTarget(animal.id)}
                  >
                    Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteCard
                id={animal.id}
                open={deleteTarget === animal.id}
                onClose={() => setDeleteTarget(null)}
                table="Animal"
                action={() => deleteAnimal(animal.id)}
              />
              <EditAnimal
                open={editTarget === animal.id}
                onClose={() => setEditTarget(null)}
                animal={animal}
                tipos={tipoAnimal}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
