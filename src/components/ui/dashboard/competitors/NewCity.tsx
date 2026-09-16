import { newCity } from "@/actions/citys";

import NewCard from "../../crud/NewCard";
import { Field, FieldGroup } from "../../field";
import { Input } from "../../input";
import { Label } from "../../label";

export default function NewCity() {
  return (
    <NewCard table="Cidade" action={newCity}>
      <FieldGroup>
        <Field>
          <Label htmlFor="descricao">Nome</Label>
          <Input
            placeholder="Digite o nome da cidade"
            id="descricao"
            name="descricao"
          />
        </Field>
        <Field>
          <Label htmlFor="uf">UF</Label>
          <Input placeholder="Digite a UF do estado" name="uf" id="uf" />
        </Field>
      </FieldGroup>
    </NewCard>
  );
}
