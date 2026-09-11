"use server";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import type FormState from "@/types/FormState";
import { revalidatePath } from "next/cache";

export async function getAnimals() {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return [];
  }
  const animals = await prisma.animal.findMany({
    include: { tipoAnimal: true },
  });
  return animals;
}

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
  revalidatePath("/dashboard/animals");

  return { message: "Animal adicionado com sucesso!", type: "success" };
}

export async function deleteAnimal(id: string) {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Não autorizado!", type: "error" };
  }
  await prisma.animal.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/dashboard/animals");
  return { message: "Animal deletado com sucesso!", type: "success" };
}

export async function editAnimal(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Acesso não autorizado!", type: "error" };
  }
  const dataForm = {
    id: formData.get("id") as string,
    nome: formData.get("nome") as string,
    tipoAnimal: formData.get("tipoAnimal") as string,
  };

  if (dataForm.nome.trim().length < 4) {
    return {
      message: "O nome do animal deve ter no mínimo 4 caractéres",
      type: "error",
    };
  }

  const original = await prisma.animal.findFirst({
    where: { id: dataForm.id },
    include: { tipoAnimal: true },
  });

  const hasChanges =
    dataForm.nome !== original?.nome ||
    dataForm.tipoAnimal !== original?.tipoAnimalId;
  if (!hasChanges) {
    return { message: "Nenhuma alteração foi feita!", type: "error" };
  } else {
    const dataToUpdate = {
      nome: dataForm.nome,
      tipoAnimalId: dataForm.tipoAnimal,
    };
    await prisma.animal.update({
      where: { id: dataForm.id },
      data: dataToUpdate,
    });
  }
  revalidatePath("/dashboard/animals");
  return { message: "Animal editado com sucesso!", type: "success" };
}
