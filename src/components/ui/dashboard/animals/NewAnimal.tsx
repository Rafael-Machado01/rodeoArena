"use client";
import { useState } from "react";

import newAnimal from "@/actions/animals";
import FormCard from "@/components/ui/crud/FormCard";
import SelectOptions from "@/components/ui/crud/SelectOptions";
import UploadImage from "@/components/ui/crud/UploadImage";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type SelectOptionType from "@/types/SelectOptionType";

interface NewAnimalProps {
  tiposAnimal: SelectOptionType[];
}

export default function NewAnimal({ tiposAnimal }: NewAnimalProps) {
  const [selected, setSelected] = useState("");
  const [newImage, setNewImage] = useState("");
  return (
    <FormCard action={newAnimal} table="Adicionar Animal">
      <FieldGroup>
        <UploadImage onImageChange={(url) => setNewImage(url ?? "")} />
        <input type="hidden" value={newImage} id="imageUrl" name="imageUrl" />
        <input
          type="hidden"
          value={selected}
          id="tipoAnimalId"
          name="tipoAnimalId"
        />
        <Field>
          <Label htmlFor="nome">Nome</Label>
          <Input placeholder="Digite o nome do Animal" id="name" name="name" />
        </Field>
        <Field>
          <Label>Tipo do Animal</Label>
          <SelectOptions
            items={tiposAnimal}
            value={selected}
            placeholder="Selecione o Tipo do Animal"
            onChanged={(value) => setSelected(value ?? "")}
          />
        </Field>
      </FieldGroup>
    </FormCard>
  );
}
