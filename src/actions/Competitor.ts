"use server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import FormState from "@/types/FormState";

export async function newCompetitor(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Acesso não autorizado!", type: "error" };
  }
  const dataForm = {
    nome: formData.get("name") as string,
    imageUrl: formData.get("imageUrl") as string,
    idade: formData.get("age") as string,
    vitorias: formData.get("wins") as string,
    cidadeId: formData.get("cidadeId") as string,
  };

  if (dataForm.nome.trim().length < 4) {
    return {
      message: "O nome do competidor deve ter no mínimo 4 caractéres",
      type: "error",
    };
  } else if (Number(dataForm.idade) < 15) {
    return { message: "O competidor deve ter mais de 15 anos", type: "error" };
  } else if (dataForm.cidadeId === "" || dataForm.cidadeId === null) {
    return { message: "O competidor deve ter uma cidade!", type: "error" };
  }
  await prisma.competidor.create({
    data: {
      nome: dataForm.nome,
      idade: Number(dataForm.idade),
      cidadeId: dataForm.cidadeId,
      vitorias: Number(dataForm.vitorias),
      ...(dataForm.imageUrl && {
        imageUrl: dataForm.imageUrl,
      }),
    },
  });
  revalidatePath("/dashboard/competitors");
  return { message: "Competidor adicionado com sucesso", type: "success" };
}

export async function getAllCompetitors() {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return [];
  }
  const competitors = await prisma.competidor.findMany({
    include: { cidade: true },
  });
  return competitors;
}

export async function deleteCompetitor(id: string) {
  const loggedUser = getCurrentUser();
  if (!loggedUser) {
    return;
  }
  await prisma.competidor.delete({
    where: { id: id },
  });
  revalidatePath("/dashboard/competitors");
}
