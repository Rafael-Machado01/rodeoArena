"use server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import FormState from "@/types/FormState";
export default async function getAllCidades() {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return [];
  }
  const citys = await prisma.cidade.findMany();

  return citys;
}

export async function newCity(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const loggedUser = getCurrentUser();
  if (!loggedUser) {
    return { message: "Acesso não autorizado!", type: "error" };
  }
  const dataForm = {
    nome: formData.get("descricao") as string,
    uf: formData.get("uf") as string,
  };
  if (dataForm.nome.trim().length < 3) {
    return {
      message: "O nome da cidade deve conter pelo mínimo 3 caracteres",
      type: "error",
    };
  } else if (dataForm.uf.trim().length === 0) {
    return {
      message: "Digite a uf do estado!",
      type: "error",
    };
  } else {
    await prisma.cidade.create({
      data: {
        descricao: dataForm.nome,
        estado: dataForm.uf,
      },
    });
    revalidatePath("/dashboard/competitors");
  }

  return { message: "Cidade Adicionada com sucesso!", type: "success" };
}
