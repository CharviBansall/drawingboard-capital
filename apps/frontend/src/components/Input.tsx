import { Label } from 'radix-ui';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export default function Input({ props }: { props: InputProps }) {
  const [isFocused, setIsFocused] = React.useState(false);

  const isActive =
    isFocused || (typeof props.value === 'string' && props.value.length > 0);

  return (
    <div
      className={`relative bg-blue-9 text-white border border-slate-700 focus-within:border-slate-500 rounded-md p-2 h-14 ${props.className}`}
    >
      <Label.Root
        className={`absolute transition-all duration-200 ${
          isActive
            ? 'transform text-xs -translate-y-0 text-slate-400'
            : 'transform translate-y-2 text-slate-400'
        }`}
      >
        {props.label}
      </Label.Root>
      <input
        className={`w-full bg-transparent focus:outline-none pt-4 text-white ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </div>
  );
}
