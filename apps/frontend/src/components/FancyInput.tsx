import { Label } from 'radix-ui';
import React from 'react';

/**
 * A fancy input component with animated label and focus states.
 * Provides a modern, clean input field with floating label behavior.
 */
interface FancyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The label text displayed for the input */
  label: string;

  /** Additional CSS classes to apply to the input container */
  className?: string;
}

/**
 * FancyInput component that provides an enhanced input experience with animated label.
 * The label floats above the input when the input is focused or has a value.
 *
 * @example
 * <FancyInput
 *   label="Email"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 */
export default function FancyInput(props: FancyInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const isActive =
    isFocused || (typeof props.value === 'string' && props.value.length > 0);

  return (
    <div
      className={`relative bg-blue-9 text-white border border-slate-700 focus-within:border-slate-500 rounded-md p-2 h-14 ${props.className || ''}`}
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
