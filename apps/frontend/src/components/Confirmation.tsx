import { CheckIcon } from 'lucide-react';
import { Checkbox, Label } from 'radix-ui';
import { useId } from 'react';

interface ConfirmationProps {
  label?: string | React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  required?: boolean;
  id?: string;
}

export default function Confirmation({
  label,
  checked,
  onCheckedChange,
  required,
  id,
}: ConfirmationProps) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;

  return (
    <div className="w-full flex items-start gap-2">
      <div className="flex-shrink-0 mt-0.5">
        <Checkbox.Root
          id={inputId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          required={required}
          className="bg-white h-4 w-4 flex items-center justify-center rounded-sm aspect-square"
        >
          <Checkbox.Indicator className="flex items-center justify-center">
            <CheckIcon className="text-black" size={12} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      {label && (
        <Label.Root htmlFor={inputId} className="flex-1 text-sm cursor-pointer">
          {label}
        </Label.Root>
      )}
    </div>
  );
}
