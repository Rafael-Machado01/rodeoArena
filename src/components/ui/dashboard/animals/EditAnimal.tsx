import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { Prisma } from "@/generated/prisma/browser";
import SelectTipoAnimal from "./SelectTipoAnimal";
import { useActionState, useState, useEffect } from "react";
import type TipoAnimalOption from "@/types/TipoAnimal";
import { editAnimal } from "@/actions/animals";
import FormState from "@/types/FormState";
import { toast } from "../../toast";

type AnimalWithType = Prisma.AnimalGetPayload<{
  include: { tipoAnimal: true };
}>;

interface EditAnimalProps {
  animal: AnimalWithType;
  items: TipoAnimalOption[];
  open: boolean;
  onClose: () => void;
}
export default function EditAnimal({
  animal,
  open,
  onClose,
  items,
}: EditAnimalProps) {
  const defaultTipo = animal.tipoAnimalId;
  const [select, setSelect] = useState(defaultTipo);
  const [formState, formAction] = useActionState(editAnimal, {
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
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader className="mb-2">
            <DialogTitle>Editar Animal</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <input type="hidden" id="id" name="id" defaultValue={animal.id} />
              <input
                type="hidden"
                id="tipoAnimal"
                name="tipoAnimal"
                value={select}
              />
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" defaultValue={animal.nome} />
            </Field>
            <Field>
              <SelectTipoAnimal
                value={select}
                onChanged={(value) => setSelect(value ?? "")}
                items={items}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-2">
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <Button type="submit">Editar Animal</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
