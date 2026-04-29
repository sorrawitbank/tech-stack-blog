import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import STATUSES from "@/constants/status";

interface Props {
  defaultStatusId: number;
  onStatusChange: (statusId: string) => void;
}

function StatusSelector(props: Props) {
  return (
    <Select
      onValueChange={props.onStatusChange}
      defaultValue={String(STATUSES[props.defaultStatusId].id)}
    >
      <SelectTrigger className="w-full h-12! text-brown-400 style-body-1 bg-white md:w-40 hover:cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel className="text-brown-600">Status</SelectLabel>
          <SelectSeparator className="bg-brown-300" />
          {STATUSES.map((status) => (
            <SelectItem
              key={status.id}
              value={String(status.id)}
              className="text-brown-400 hover:text-brown-500! hover:bg-brown-200! hover:cursor-pointer"
            >
              {status.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default StatusSelector;
