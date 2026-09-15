import { Pencil } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect,useState } from "react";

import { editAnimal } from "@/actions/animals";
import { Button } from "@/components/ui/button";
import SelectTipoAnimal from "@/components/ui/dashboard/animals/SelectTipoAnimal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";
import { TailwindData } from "@/constants/TailwindData";
import type { Prisma } from "@/generated/prisma/browser";
import { useEdgeStore } from "@/lib/edgestore";
import FormState from "@/types/FormState";
import type TipoAnimalOption from "@/types/TipoAnimal";

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
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const imageSrc = newImageUrl || animal.imageUrl;

  const { edgestore } = useEdgeStore();

  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const res = await edgestore.publicFiles.upload({
      file,
    });

    setNewImageUrl(res.url);
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <form action={formAction}>
          <DialogHeader className="mb-2">
            <DialogTitle>Editar Animal</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label
                htmlFor="image"
                className={`${TailwindData.centered} cursor-pointer`}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={onUploadFile}
                />
                <div className="relative">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Foto do animal"
                      width={56}
                      height={56}
                      className="h-14 w-14 object-cover rounded-full"
                    />
                  ) : (
                    <p className="text-rodeo-surface">Ola</p>
                  )}
                  <span
                    className={`absolute inset-0 ${TailwindData.centered} rounded-full bg-black/40 text-xs text-text `}
                  >
                    <Pencil />
                  </span>
                </div>
              </Label>
            </Field>
            <Field>
              <input type="hidden" id="id" name="id" defaultValue={animal.id} />
              <input
                type="hidden"
                id="tipoAnimal"
                name="tipoAnimal"
                value={select}
              />
              <input
                type="hidden"
                id="imageUrl"
                name="imageUrl"
                value={newImageUrl || ""}
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
