"use client";
import { useState } from "react";

import { newRound } from "@/actions/round";
import FormCard from "@/components/ui/crud/FormCard";
import SelectOptions from "@/components/ui/crud/SelectOptions";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectOptionType from "@/types/SelectOptionType";

interface NewRoundProps {
  animals: SelectOptionType[];
  competitors: SelectOptionType[];
}

export default function NewRound({ animals, competitors }: NewRoundProps) {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedCompetidor, setSelectedCompetidor] = useState("");
  return (
    <FormCard table="Adicionar Round" action={newRound}>
      <FieldGroup>
        <Field>
          <input
            id="animalId"
            name="animalId"
            value={selectedAnimal}
            type="hidden"
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
            id="competidorId"
            name="competidorId"
            value={selectedCompetidor}
            type="hidden"
          />
          <SelectOptions
            items={competitors}
            placeholder="Selecione o competidor"
            value={selectedCompetidor}
            onChanged={(value) => setSelectedCompetidor(value ?? "")}
          />
        </Field>
        <Field>
          <Label htmlFor="date">Data</Label>
          <Input type="date" name="date" id="date" />
        </Field>
        <Field>
          <Label htmlFor="notaAnimal">Nota Animal</Label>
          <Input type="number" name="notaAnimal" id="notaAnimal" />
        </Field>
        <Field>
          <Label htmlFor="notaCompetidor">Nota Competidor</Label>
          <Input type="number" name="notaCompetidor" id="notaCompetidor" />
        </Field>
        <Field>
          <Label>Penalidade</Label>
          <Input type="number" name="penalidade" id="penalidade" />
        </Field>
      </FieldGroup>
    </FormCard>
  );
}
