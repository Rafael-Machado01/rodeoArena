"use client";
import { useState } from "react";

import { newCity } from "@/actions/citys";
import FormCard from "@/components/ui/crud/FormCard";
import SelectOptions from "@/components/ui/crud/SelectOptions";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type SelectOptionType from "@/types/SelectOptionType";

interface NewCityProps {
  ufs: SelectOptionType[];
}

export default function NewCity({ ufs }: NewCityProps) {
  const [selected, setSelected] = useState("");
  return (
    <FormCard table="Adicionar Cidade" action={newCity}>
      <FieldGroup>
        <Field>
          <input name="ufId" id="ufId" type="hidden" value={selected} />
          <Label htmlFor="descricao">Nome</Label>
          <Input
            placeholder="Digite o nome da cidade"
            id="descricao"
            name="descricao"
          />
        </Field>
        <Field>
          <Label htmlFor="uf">UF</Label>
          <SelectOptions
            items={ufs}
            value={selected}
            onChanged={(value) => setSelected(value ?? "")}
            placeholder="Selecione a UF da cidade"
          />
        </Field>
      </FieldGroup>
    </FormCard>
  );
}
