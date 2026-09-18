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
  const citys = await prisma.cidade.findMany({ include: { estado: true } });

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
    uf: formData.get("ufId") as string,
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
        estadoId: dataForm.uf,
      },
    });
    revalidatePath("/dashboard/competitors");
  }

  return { message: "Cidade Adicionada com sucesso!", type: "success" };
}

export async function getAllUfs() {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return [];
  } else {
    const ufs = await prisma.estado.findMany();
    return ufs;
  }
}

export async function editCitys(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Acesso não autorizado!", type: "error" };
  }
  const dataForm = {
    id: formData.get("id") as string,
    descricao: formData.get("descricao") as string,
    estadoId: formData.get("ufId") as string,
  };

  const original = await prisma.cidade.findFirst({
    where: { id: dataForm.id },
  });

  if (dataForm.descricao.trim().length < 3) {
    return {
      message: "O nome da cidade deve conter no mínimo 3 carácteres",
      type: "error",
    };
  } else if (dataForm.estadoId.trim().length === 0) {
    return {
      message: "A cidade deve conter uma UF!",
      type: "error",
    };
  }

  const hasChanges =
    dataForm.descricao !== original?.descricao ||
    dataForm.estadoId !== original?.estadoId;

  if (!hasChanges) {
    return { message: "Nenhuma alteração feita!", type: "error" };
  } else {
    await prisma.cidade.update({
      where: { id: dataForm.id },
      data: {
        descricao: dataForm.descricao,
        estadoId: dataForm.estadoId,
      },
    });
  }
  return { message: "Cidade editada com sucesso!", type: "success" };
}

export async function deleteCity(id: string) {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return null;
  }
  await prisma.cidade.delete({
    where: { id: id },
  });
  revalidatePath("/dashboard/citys");
}
