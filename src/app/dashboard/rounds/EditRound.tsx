"use client";
import { useState } from "react";

import { editRound } from "@/actions/round";
import FormCard from "@/components/ui/crud/FormCard";
import SelectOptions from "@/components/ui/crud/SelectOptions";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Prisma } from "@/generated/prisma/browser";
import type SelectOptionType from "@/types/SelectOptionType";

type RoundWithRelations = Prisma.RoundGetPayload<{
  include: { animal: { include: { tipoAnimal: true } }; competidor: true };
}>;

interface EditRoundProps {
  round: RoundWithRelations;
  animals: SelectOptionType[];
  competitors: SelectOptionType[];
  open: boolean;
  onClose: () => void;
}

export default function EditRound({
  round,
  animals,
  competitors,
  open,
  onClose,
}: EditRoundProps) {
  const [selectedAnimal, setSelectedAnimal] = useState(round.animalId);
  const [selectedCompetitor, setSelectedCompetitor] = useState(
    round.competidorId,
  );
  return (
    <FormCard
      edit={true}
      open={open}
      onClose={onClose}
      table="Editar Round"
      action={editRound}
    >
      <FieldGroup>
        <Field>
          <input type="hidden" id="id" name="id" value={round.id} />
          <input
            type="hidden"
            id="animalId"
            name="animalId"
            value={selectedAnimal}
          />
          <SelectOptions
            items={animals}
            value={selectedAnimal}
            onChanged={(value) => setSelectedAnimal(value ?? "")}
            placeholder="Selecione o Animal"
          />
        </Field>
        <Field>
          <input
            type="hidden"
            id="competidorId"
            name="competidorId"
            value={selectedCompetitor}
          />
          <SelectOptions
            items={competitors}
            value={selectedCompetitor}
            onChanged={(value) => setSelectedCompetitor(value ?? "")}
            placeholder="Selecione o competidor"
          />
        </Field>
        <Field>
          <Label htmlFor="date">Data</Label>
          <Input type="date" name="date" id="date" defaultValue={round.data} />
        </Field>
        <Field>
          <Label htmlFor="notaAnimal">Nota Animal</Label>
          <Input
            type="number"
            name="notaAnimal"
            id="notaAnimal"
            defaultValue={round.notaAnimal}
          />
        </Field>
        <Field>
          <Label htmlFor="notaCompetidor">Nota Competidor</Label>
          <Input
            type="number"
            name="notaCompetidor"
            id="notaCompetidor"
            defaultValue={round.notaCompetidor}
          />
        </Field>
        <Field>
          <Label htmlFor="penalidade">Penalidade</Label>
          <Input
            type="number"
            name="penalidade"
            id="penalidade"
            defaultValue={round.penalidade}
          />
        </Field>
      </FieldGroup>
    </FormCard>
  );
}