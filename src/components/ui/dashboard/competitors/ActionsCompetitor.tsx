"use client";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

import { deleteCompetitor } from "@/actions/Competitor";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeleteCard from "../../crud/DeleteCard";

interface ActionsCompetidorProps {
  id: string;
}

export default function ActionsCompetidor({ id }: ActionsCompetidorProps) {
  const [open, setOpen] = useState(false);
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
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Deletar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteCard
        id={id}
        open={open}
        onClose={() => setOpen(!open)}
        table="Competidor"
        action={() => deleteCompetitor(id)}
      />
    </div>
  );
}
