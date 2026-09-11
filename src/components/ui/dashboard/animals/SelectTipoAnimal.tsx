import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type TipoAnimalOption from "@/types/TipoAnimalOption";

interface SelectTipoAnimalProps {
  items: TipoAnimalOption[];
  value: string;
  onChanged: (value: string | null) => void;
}
export default function SelectTipoAnimal({
  items,
  value,
  onChanged,
}: SelectTipoAnimalProps) {
  return (
    <Select
      name="tipoAnimalId"
      value={value}
      onValueChange={onChanged}
      itemToStringLabel={(itemValue) =>
        items.find((item) => item.value === itemValue)?.label ?? String(itemValue)
      }
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Tipo do Animal" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
