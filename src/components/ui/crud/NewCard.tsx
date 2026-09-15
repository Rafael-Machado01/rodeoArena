"use client";
import { Plus } from "lucide-react";
import { useActionState, useEffect } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type FormState from "@/types/FormState";

import { Button } from "../button";
import { toast } from "../toast";
interface NewCardProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  children: React.ReactNode;
  table: string;
}

export default function NewCard({ action, table, children }: NewCardProps) {
  const [formState, formAction] = useActionState(action, {
    message: "",
    type: "success",
  } as FormState);

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
          <Button size="lg">
            <span>
              <Plus />
            </span>{" "}
            Adicionar {table}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar {table}</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          {children}
          <DialogFooter className="mt-4">
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <Button type="submit">Adicionar {table}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
