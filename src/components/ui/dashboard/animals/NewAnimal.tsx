"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type FormState from "@/types/FormState";
import newAnimal from "@/actions/animals";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectTipoAnimal from "./SelectTipoAnimal";
import type TipoAnimalOption from "@/types/TipoAnimalOption";
import { useActionState, useEffect, useState } from "react";
import { toast } from "../../toast";

interface NewAnimalProps {
  tipoAnimal: TipoAnimalOption[];
}

export default function NewAnimal({ tipoAnimal }: NewAnimalProps) {
  const [formState, formAction] = useActionState(newAnimal, {
    message: "",
    type: "success",
  } as FormState);

  useEffect(() => {
    if (formState.message != "") {
      toast.add({
        title: formState.type,
        description: formState.message,
        type: formState.type,
      });
    }
  });

  const [selected, setSelected] = useState("");
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="lg">
            <span>
              <Plus />
            </span>{" "}
            Novo Animal
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo Animal</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <FieldGroup>
            <input
              type="hidden"
              id="tipoAnimalId"
              name="tipoAnimalId"
              value={selected}
            />
            <Field>
              <Label htmlFor="name">Nome</Label>
              <Input
                placeholder="Digite o nome do Animal"
                id="name"
                name="name"
              />
            </Field>
            <Field>
              <SelectTipoAnimal
                items={tipoAnimal}
                value={selected}
                onChanged={(value) => setSelected(value ?? "")}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <Button type="submit">Adicionar novo animal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
