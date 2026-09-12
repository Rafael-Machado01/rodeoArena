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
import type TipoAnimalOption from "@/types/TipoAnimal";
import { useActionState, useEffect, useState } from "react";
import { toast } from "../../toast";
import { useEdgeStore } from "@/lib/edgestore";
import { TailwindData } from "@/constants/TailwindData";
import Image from "next/image";

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
  const [newImage, setNewImage] = useState<null | string>(null);
  const { edgestore } = useEdgeStore();

  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await edgestore.publicFiles.upload({
      file,
    });

    setNewImage(res.url);
  };
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
            <input
              type="hidden"
              id="imageUrl"
              name="imageUrl"
              value={newImage || ""}
            />
            <Field>
              <Label
                htmlFor="image"
                className={` ${TailwindData.centered} cursor-pointer`}
              >
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  className="hidden"
                  onChange={onUploadFile}
                />

                <div className="relative">
                  {newImage && (
                    <Image
                      src={newImage}
                      alt="Foto do Animal"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-cover rounded-full"
                    />
                  )}
                  <Plus className="bg-black/30 rounded-full" />
                </div>
              </Label>
            </Field>
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
