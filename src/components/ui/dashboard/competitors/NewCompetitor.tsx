"use client";
import { useState } from "react";

import { newCompetitor } from "@/actions/Competitor";
import SelectOptionType from "@/types/SelectOptionType";

import NewCard from "../../crud/NewCard";
import SelectOptions from "../../crud/SelectOptions";
import UploadImage from "../../crud/UploadImage";
import { FieldGroup } from "../../field";
import { Field } from "../../field";
import { Input } from "../../input";
import { Label } from "../../label";
interface NewCompetitorProps {
  citys: SelectOptionType[];
}
export default function NewCompetitor({ citys }: NewCompetitorProps) {
  const [selected, setSelected] = useState("");
  const [newImage, setNewImage] = useState("");
  return (
    <NewCard action={newCompetitor} table="Competidor">
      <FieldGroup>
        <Field>
          <input type="hidden" id="imageUrl" name="imageUrl" value={newImage} />
          <input type="hidden" id="cidadeId" name="cidadeId" value={selected} />
          <UploadImage onImageChange={(url) => setNewImage(url)} />
        </Field>
        <Field>
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            placeholder="Digite o nome do competidor"
          />
        </Field>
        <Field>
          <Label htmlFor="age">Idade</Label>
          <Input
            id="age"
            name="age"
            placeholder="Digite a idade do competidor"
          />
        </Field>
        <Field>
          <Label htmlFor="wins">Vitórias</Label>
          <Input
            id="wins"
            name="wins"
            placeholder="Digite as vitórias do competidor"
          />
        </Field>
        <Field>
          <Label>Cidade</Label>
          <SelectOptions
            items={citys}
            value={selected}
            onChanged={(value) => setSelected(value)}
            placeholder="Selecione a cidade"
          />
        </Field>
      </FieldGroup>
    </NewCard>
  );
}
