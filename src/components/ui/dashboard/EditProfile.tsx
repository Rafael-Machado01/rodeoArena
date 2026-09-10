"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User as UserType } from "@/types/User";
import Image from "next/image";
import { TailwindData } from "@/constants/TailwindData";
import { useActionState, useState, useEffect } from "react";
import FormState from "@/types/FormState";
import updateUser from "@/actions/user";
import { Pencil } from "lucide-react";
import { useEdgeStore } from "@/lib/edgestore";
import { toast } from "@/components/ui/toast";

interface EditarPerfiProps {
  user: UserType;
}

export default function EditarPerfil({ user }: EditarPerfiProps) {
  const [formState, formAction] = useActionState(updateUser, {
    message: "",
    type: "success",
  } as FormState);

  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

  const { edgestore } = useEdgeStore();

  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const res = await edgestore.publicFiles.upload({
      file,
    });

    setNewImageUrl(res.url);
  };

  useEffect(() => {
    if (formState.message != "") {
      toast.add({
        title: formState.type,
        description: formState.message,
        type: formState.type,
      });
    }
  }, [formState]);
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button className="flex flex-row gap-1 cursor-pointer">
            <Image
              src="/config.svg"
              alt="Botão de configurações"
              width={20}
              height={20}
              className="fill-text-muted"
            />
            <span
              className={`text-text-muted hover:text-rodeo-gold text-sm ${TailwindData.transitionHover}`}
            >
              Configurações
            </span>
          </button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="id" id="id" value={user.id} />
          <input
            type="hidden"
            name="imageUrl"
            id="imageUrl"
            value={newImageUrl || ""}
          />
          <FieldGroup>
            <Field>
              <Label
                htmlFor="avatar"
                className={`${TailwindData.centered} cursor-pointer`}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="avatar"
                  name="avatar"
                  className="hidden"
                  onChange={onUploadFile}
                />
                <div className="relative">
                  <Image
                    src={newImageUrl || user.image}
                    alt="Sua foto de perfil"
                    width={56}
                    height={56}
                    className="h-14 w-14 object-cover rounded-full"
                  />
                  <span
                    className={`absolute inset-0 ${TailwindData.centered} rounded-full bg-black/40 text-xs text-text `}
                  >
                    <Pencil />
                  </span>
                </div>
              </Label>
            </Field>
          </FieldGroup>
          <FieldGroup className="mb-3">
            <Field>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                key={user.name}
                defaultValue={user.name}
              />
            </Field>
            <Field>
              <Label htmlFor="role">Cargo</Label>
              <Input
                id="role"
                name="role"
                key={user.role}
                defaultValue={user.role}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <Button type="submit">Editar Perfil</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
