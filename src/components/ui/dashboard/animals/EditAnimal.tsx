import { useState } from "react";

import { editAnimal } from "@/actions/animals";
import FormCard from "@/components/ui/crud/FormCard";
import SelectOptions from "@/components/ui/crud/SelectOptions";
import UploadImage from "@/components/ui/crud/UploadImage";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Animal } from "@/generated/prisma/client";
import SelectOptionType from "@/types/SelectOptionType";

interface EditAnimalProps {
  animal: Animal;
  tipos: SelectOptionType[];
  open: boolean;
  onClose: () => void;
}

export default function EditAnimal({
  animal,
  tipos,
  open,
  onClose,
}: EditAnimalProps) {
  const [newImage, setNewImage] = useState("");
  const [selected, setSelected] = useState(animal.tipoAnimalId);
  return (
    <FormCard
      edit={true}
      open={open}
      onClose={onClose}
      table="Editar Animal"
      action={editAnimal}
    >
      <FieldGroup>
        <Field>
          <UploadImage onImageChange={(url) => setNewImage(url ?? "")} />
        </Field>
        <Field>
          <input type="hidden" id="id" name="id" value={animal.id} />
          <input type="hidden" id="imageUrl" name="imageUrl" value={newImage} />
          <input
            type="hidden"
            id="tipoAnimalId"
            name="tipoAnimalId"
            value={selected}
          />
          <Label>Nome</Label>
          <Input id="name" name="name" defaultValue={animal.nome} />
        </Field>
        <Field>
          <SelectOptions
            items={tipos}
            value={selected}
            onChanged={(value) => setSelected(value ?? "")}
            placeholder="Escolha o tipo animal"
          />
        </Field>
      </FieldGroup>
    </FormCard>
  );
}
