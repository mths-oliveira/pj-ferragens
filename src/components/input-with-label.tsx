import { cn } from "@/lib/utils/class-name-merge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function InputWithLabel(props: InputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={props.id}>{props.label}</Label>
      <Input className={cn("border", props.className)} {...props} />
    </div>
  );
}
