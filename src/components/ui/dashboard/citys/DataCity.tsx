"use client";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

import { deleteCity } from "@/actions/citys";
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
import { Prisma } from "@/generated/prisma/browser";
import type SelectOptionType from "@/types/SelectOptionType";

import DeleteCard from "../../crud/DeleteCard";
import EditCity from "./EditCity";

type CityWithUf = Prisma.CidadeGetPayload<{
  include: { estado: true };
}>;

interface DataCityProps {
  citys: CityWithUf[];
  ufs: SelectOptionType[];
}
export default function DataCity({ citys, ufs }: DataCityProps) {
  const [editTarget, setEditTarget] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>UF</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {citys.map((c) => (
          <>
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.descricao}</TableCell>
              <TableCell>{c.estado?.descricao}</TableCell>
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
                    <DropdownMenuItem onClick={() => setEditTarget(c.id)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setDeleteTarget(c.id)}
                      variant="destructive"
                    >
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
<DeleteCard
              table="Cidade"
              id={c.id}
              open={deleteTarget === c.id}
              onClose={() => setDeleteTarget(null)}
              action={() => deleteCity(c.id)}
            />
            <EditCity
              city={c}
              ufs={ufs}
              open={editTarget === c.id}
              onClose={() => setEditTarget(null)}
            />
          </>
        ))}
      </TableBody>
    </Table>
  );
}
