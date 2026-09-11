"use client";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import type { Prisma } from "@/generated/prisma";
import DeleteAnimal from "./DeleteAnimal";
import { useState } from "react";
import type TipoAnimalOption from "@/types/TipoAnimal";
import EditAnimal from "./EditAnimal";
type AnimalWithTipo = Prisma.AnimalGetPayload<{
  include: { tipoAnimal: true };
}>;

interface DataAnimalProps {
  animais: AnimalWithTipo;
  tipoAnimal: TipoAnimalOption[];
}

export function DataAnimal({ animais, tipoAnimal }: DataAnimalProps) {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);

  const handleClickCloseDelete = () => {
    setToggleDelete(!toggleDelete);
  };

  const handleClickCloseEdit = () => {
    setToggleEdit(!toggleEdit);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Tipo Animal</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {animais.map((animal) => (
          <TableRow key={animal.id}>
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
                  <DropdownMenuItem onClick={() => setToggleEdit(true)}>
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setToggleDelete(true)}
                  >
                    Deletar
                  </DropdownMenuItem>
                </DropdownMenuContent>
                <DeleteAnimal
                  id={animal.id}
                  open={toggleDelete}
                  onClose={handleClickCloseDelete}
                />
                <EditAnimal
                  animal={animal}
                  items={tipoAnimal}
                  open={toggleEdit}
                  onClose={handleClickCloseEdit}
                />
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
