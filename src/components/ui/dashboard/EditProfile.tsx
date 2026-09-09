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
interface EditarPerfiProps {
  user: UserType;
}

export default function EditarPerfil({ user }: EditarPerfiProps) {
  return (
    <Dialog>
      <form>
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
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" defaultValue={user.name} />
            </Field>
            <Field>
              <Label htmlFor="role">Cargo</Label>
              <Input id="username-1" name="username" defaultValue={user.role} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <Button type="submit">Editar Perfil</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
