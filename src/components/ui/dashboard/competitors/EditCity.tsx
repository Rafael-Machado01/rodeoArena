"use client";
import { useState } from "react";

import { editCitys } from "@/actions/citys";
import type { Prisma } from "@/generated/prisma/browser";

import FormCard from "../../crud/FormCard";
import SelectOptions from "../../crud/SelectOptions";
import { FieldGroup } from "../../field";
import { Field } from "../../field";
import { Input } from "../../input";
import { Label } from "../../label";

type CityWithEstado = Prisma.CidadeGetPayload<{
  include: { estado: true };
}>;
import SelectOptionType from "@/types/SelectOptionType";

interface EditCityProps {
  city: CityWithEstado;
  ufs: SelectOptionType[];
  open?: boolean;
  onClose?: () => void;
}

export default function EditCity({ city, ufs, open, onClose }: EditCityProps) {
  const [selected, setSelected] = useState(city.estadoId ?? "");
  return (
    <FormCard table="Editar Cidade" action={editCitys} edit={true} open={open} onClose={onClose}>
      <FieldGroup>
        <Field>
          <input type="hidden" name="id" id="id" value={city.id} />
          <input type="hidden" name="ufId" id="ufId" value={selected} />
          <Label htmlFor="name">Nome</Label>
          <Input id="name" name="name" defaultValue={city.descricao} />
        </Field>
        <Field>
          <SelectOptions
            value={selected}
            onChanged={(value) => setSelected(value ?? "")}
            items={ufs}
            placeholder="Selecione a UF"
          />
        </Field>
      </FieldGroup>
    </FormCard>
  );
}
