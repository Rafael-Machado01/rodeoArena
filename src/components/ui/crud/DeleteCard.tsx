import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteCardProps {
  table: string;
  id: string;
  open: boolean;
  action: (id: string) => void;
  onClose: () => void;
}

export default function DeleteCard({
  table,
  id,
  open,
  action,
  onClose,
}: DeleteCardProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Voce tem certeza deletar este {table}?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita, apagará os dados de forma
            permanete.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button type="button">Voltar</Button>} />
          <Button variant={"destructive"} onClick={() => action(id)}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
