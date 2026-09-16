import { useState } from "react";

import { editCompetitor } from "@/actions/Competitor";
import type { Prisma } from "@/generated/prisma/client";
import SelectOptionType from "@/types/SelectOptionType";

import FormCard from "../../crud/FormCard";
import SelectOptions from "../../crud/SelectOptions";
import UploadImage from "../../crud/UploadImage";
import { Field, FieldGroup } from "../../field";
import { Input } from "../../input";
import { Label } from "../../label";

type CompetitorsWithRounds = Prisma.CompetidorGetPayload<{
  include: {
    cidade: { include: { estado: true } };
    rounds: { select: { animalId: true } };
  };
}>;

interface EditCompetitorsProps {
  open: boolean;
  onClose: () => void;
  competidor: CompetitorsWithRounds;
  citys: SelectOptionType[];
}
export default function EditCompetitors({
  open,
  onClose,
  competidor,
  citys,
}: EditCompetitorsProps) {
  const [selected, setSelected] = useState(competidor.cidade.id);
  const [newImage, setNewImage] = useState("");
  return (
    <FormCard
      action={editCompetitor}
      table="Editar Competidor"
      edit={true}
      open={open}
      onClose={onClose}
    >
      <FieldGroup>
        <Field>
          <input
            type="hidden"
            id="id"
            name="id"
            value={competidor.id}
          />
          <input type="hidden" name="cidadeId" id="cidadeId" value={selected} />
          <input type="hidden" name="imageUrl" id="imageUrl" value={newImage} />
          <UploadImage onImageChange={(url) => setNewImage(url ?? "")} />
        </Field>
        <Field>
          <Label>Nome</Label>
          <Input name="name" id="name" defaultValue={competidor.nome} />
        </Field>
        <Field>
          <Label>Idade</Label>
          <Input name="age" id="age" defaultValue={competidor.idade} />
        </Field>
        <Field>
          <Label>Vitórias</Label>
          <Input name="wins" id="wins" defaultValue={competidor.vitorias} />
        </Field>
        <Field>
          <SelectOptions
            items={citys}
            placeholder="Selecione a Cidade"
            value={selected}
            onChanged={(value) => setSelected(value ?? "")}
          />
        </Field>
      </FieldGroup>
    </FormCard>
  );
}
