import React from 'react';

/**
 * A search input component with icon and clear button functionality.
 * Provides a clean, modern search field with optional icon and clear button.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** The placeholder text for the input */
  placeholder?: string;

  /** Optional icon component to display at the start of the input */
  icon?: React.ReactNode;

  /** Whether to show a clear button when the input has a value */
  showClearButton?: boolean;

  /** Function called when the clear button is clicked */
  onClear?: () => void;

  /** Additional CSS classes to apply to the input container */
  className?: string;
}

/**
 * Input component that provides a search field with optional icon and clear button.
 * The component handles its own focus state and clear functionality.
 *
 * @example
 * <Input
 *   placeholder="Search..."
 *   icon={<SearchIcon />}
 *   showClearButton
 *   onChange={(e) => setSearchValue(e.target.value)}
 *   onClear={() => setSearchValue('')}
 * />
 */
export default function Input(props: InputProps) {
  const {
    placeholder = '',
    icon,
    showClearButton = false,
    onClear,
    className = '',
    value,
    onChange,
    ...restProps
  } = props;

  // Determine if the input has a value for showing the clear button
  const hasValue = value !== undefined && value !== '';

  // Handle clear button click
  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Input with icon */}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}

        <input
          type="text"
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...restProps}
        />

        {/* Clear button */}
        {showClearButton && hasValue && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={handleClear}
              aria-label="Clear input"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
