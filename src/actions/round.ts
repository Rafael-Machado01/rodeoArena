"use server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import type FormState from "@/types/FormState";

export async function getAllRounds() {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return [];
  }
  const rounds = await prisma.round.findMany({
    include: {
      animal: { include: { tipoAnimal: true } },
      competidor: true,
    },
    orderBy: { data: "desc" },
  });
  return rounds;
}

export async function newRound(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Acesso não autorizado!", type: "error" };
  }
  const dataForm = {
    animalId: formData.get("animalId") as string,
    competidorId: formData.get("competidorId") as string,
    data: formData.get("date") as string,
    notaAnimal: formData.get("notaAnimal") as string,
    notaCompetidor: formData.get("notaCompetidor") as string,
    penalidade: formData.get("penalidade") as string,
  };
  if (dataForm.animalId.trim().length === 0) {
    return { message: "O Round precisa ter um animal", type: "error" };
  } else if (dataForm.competidorId.trim().length === 0) {
    return { message: "O Round precisa ter um competidor", type: "error" };
  } else if (dataForm.notaAnimal.trim().length === 0) {
    return { message: "O animal precisa ter uma nota", type: "error" };
  } else if (dataForm.notaCompetidor.trim().length === 0) {
    return { message: "O competidor precisa ter uma nota", type: "error" };
  }
  await prisma.round.create({
    data: {
      animalId: dataForm.animalId,
      competidorId: dataForm.competidorId,
      data: dataForm.data,
      notaAnimal: dataForm.notaAnimal,
      notaCompetidor: dataForm.notaCompetidor,
      penalidade: dataForm.penalidade,
    },
  });
  revalidatePath("/dashboard/competitors");
  revalidatePath("/dashboard/rounds");

  return { message: "Round adicionado com sucesso", type: "success" };
}

export async function deleteRound(id: string) {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Não autorizado!", type: "error" };
  }
  await prisma.round.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/dashboard/rounds");
  return { message: "Round deletado com sucesso!", type: "success" };
}

export async function editRound(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Acesso não autorizado!", type: "error" };
  }
  const dataForm = {
    id: formData.get("id") as string,
    animalId: formData.get("animalId") as string,
    competidorId: formData.get("competidorId") as string,
    data: formData.get("date") as string,
    notaAnimal: formData.get("notaAnimal") as string,
    notaCompetidor: formData.get("notaCompetidor") as string,
    penalidade: formData.get("penalidade") as string,
  };
  if (dataForm.animalId.trim().length === 0) {
    return { message: "O Round precisa ter um animal", type: "error" };
  } else if (dataForm.competidorId.trim().length === 0) {
    return { message: "O Round precisa ter um competidor", type: "error" };
  } else if (dataForm.notaAnimal.trim().length === 0) {
    return { message: "O animal precisa ter uma nota", type: "error" };
  } else if (dataForm.notaCompetidor.trim().length === 0) {
    return { message: "O competidor precisa ter uma nota", type: "error" };
  }
  const original = await prisma.round.findFirst({
    where: { id: dataForm.id },
  });
  const hasChanges =
    dataForm.animalId !== original?.animalId ||
    dataForm.competidorId !== original?.competidorId ||
    dataForm.data !== original?.data ||
    dataForm.notaAnimal !== original?.notaAnimal ||
    dataForm.notaCompetidor !== original?.notaCompetidor ||
    dataForm.penalidade !== original?.penalidade;
  if (!hasChanges) {
    return { message: "Nenhuma alteração foi feita!", type: "error" };
  }
  await prisma.round.update({
    where: { id: dataForm.id },
    data: {
      animalId: dataForm.animalId,
      competidorId: dataForm.competidorId,
      data: dataForm.data,
      notaAnimal: dataForm.notaAnimal,
      notaCompetidor: dataForm.notaCompetidor,
      penalidade: dataForm.penalidade,
    },
  });
  revalidatePath("/dashboard/rounds");
  return { message: "Round editado com sucesso", type: "success" };
}
