"use server";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import type FormState from "@/types/FormState";

export async function getTiposAnimals() {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return [];
  }
  const items = await prisma.tipoAnimal.findMany();
  return items;
}

export default async function newAnimal(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Acesso não autorizado!", type: "error" };
  }

  const dataForm = {
    name: formData.get("name") as string,
    tipoAnimalId: formData.get("tipoAnimalId") as string,
  };

  if (dataForm.name.trim().length < 4) {
    return {
      message: "O nome do Animal deve ter no mínimo 4 caracteres",
      type: "error",
    };
  }
  await prisma.animal.create({
    data: {
      nome: dataForm.name.trim(),
      tipoAnimalId: dataForm.tipoAnimalId,
    },
  });

  return { message: "Animal adicionado com sucesso!", type: "success" };
}
