import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type SelectOptionType from "@/types/SelectOptionType";

interface SelectOptionsProps {
  items: SelectOptionType[];
  value: string;
  onChanged: (value: string | null) => void;
  placeholder: string;
}

export default function SelectOptions({
  items,
  value,
  onChanged,
  placeholder,
}: SelectOptionsProps) {
  return (
    <Select
      value={value}
      onValueChange={onChanged}
      itemToStringLabel={(itemValue) =>
        items.find((item) => item.value === itemValue)?.label ??
        String(itemValue)
      }
    >
      <SelectTrigger className="w-45">
        <SelectValue placeholder={placeholder} />
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
