import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CidadeOption } from "@/types/Cidade";

interface SelectCitysProps {
  items: CidadeOption[];
  value: string;
  onChanged: (value: string | null) => void;
}
export default function SelectCitys({
  items,
  value,
  onChanged,
}: SelectCitysProps) {
  return (
    <Select
      name="cidadeId"
      value={value}
      onValueChange={onChanged}
      itemToStringLabel={(itemValue) =>
        items.find((item) => item.value === itemValue)?.label ??
        String(itemValue)
      }
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Cidade" />
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
