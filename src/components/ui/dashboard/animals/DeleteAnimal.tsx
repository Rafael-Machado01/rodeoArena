import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../../button";

interface DeleteAnimalProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

import { deleteAnimal } from "@/actions/animals";

export default function DeleteAnimal({ id, open, onClose }: DeleteAnimalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Voce tem certeza deletar este Animal?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita, apagará os dados de forma
            permanete.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button type="button">Voltar</Button>} />
          <Button variant={"destructive"} onClick={() => deleteAnimal(id)}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
