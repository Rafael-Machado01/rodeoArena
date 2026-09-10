"use server";

import type FormState from "@/types/FormState";
import { prisma } from "@/lib/prisma";
import getCurrentUser from "@/lib/user";
import { revalidatePath } from "next/cache";

export default async function updateUser(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const loggedUser = await getCurrentUser();
  if (!loggedUser) {
    return { message: "Acesso não autorizado!", type: "error" };
  }
  const dataForm = {
    id: formData.get("id") as string,
    name: formData.get("name") as string,
    role: formData.get("role") as string,
    imageUrl: formData.get("imageUrl") as string,
  };

  // Verificações
  if (loggedUser.id != dataForm.id) {
    return {
      message: "Voce só pode alterar dados do seu perfil.",
      type: "error",
    };
  }

  if (dataForm.name.trim().length < 3) {
    return {
      message: "O seu nome deve ter no mínimo 3 caracteres",
      type: "error",
    };
  } else if (dataForm.role.trim().length < 4) {
    return {
      message: "O seu cargo deve ter no mínimo 4 caracteres",
      type: "error",
    };
  }

  const image = dataForm.imageUrl.length > 0;

  const changes =
    dataForm.name !== loggedUser.name ||
    dataForm.role !== loggedUser.role ||
    image;
  if (!changes) {
    return {
      message: "Nenhuma alteração foi realizada.",
      type: "error",
    };
  } else {
    const dataUpdated = {
      name: dataForm.name,
      role: dataForm.role,
      ...(image && {
        image: dataForm.imageUrl,
      }),
    };
    await prisma.user.update({
      where: {
        id: dataForm.id,
      },
      data: dataUpdated,
    });
    revalidatePath("/");
  }

  return { message: "Perfil editado com sucesso", type: "success" };
}
