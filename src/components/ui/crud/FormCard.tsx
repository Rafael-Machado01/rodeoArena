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
interface FormCardProps {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  children: React.ReactNode;
  table: string;
  edit?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export default function FormCard({
  action,
  table,
  children,
  edit = false,
  open,
  onClose,
}: FormCardProps) {
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
    <Dialog {...(edit ? { open, onOpenChange: onClose } : {})}>
      {edit ? (
        <></>
      ) : (
        <DialogTrigger
          render={
            <Button size="lg">
              <span>
                <Plus />
              </span>{" "}
              {table}
            </Button>
          }
        />
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{table}</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          {children}
          <DialogFooter className="mt-4">
            <DialogClose render={<Button variant="outline">Cancelar</Button>} />
            <Button type="submit">{table}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
