// RadioGroup component for displaying a group of radio button options with custom styling
import { RadioGroup as RadixRadioGroup } from 'radix-ui';

/**
 * Interface for individual radio option items
 */
interface RadioOption<T extends string> {
  /** Unique value for the radio option */
  value: T;
  /** Display label for the radio option */
  label: string;
}

/**
 * Props for the RadioGroup component
 */
interface RadioGroupProps<T extends string> {
  /** Array of radio options to display */
  options: RadioOption<T>[];

  /** Currently selected value */
  value: T;

  /**
   * Callback function when selection changes
   * @param value - The newly selected value
   */
  onChange: (value: T) => void;

  /** Name attribute for the radio input group */
  name: string;

  /** Additional CSS classes to apply to the container */
  className?: string;
}

/**
 * RadioGroup component for displaying a group of radio button options with custom styling
 *
 * Renders a horizontal group of radio buttons with custom styling where the selected
 * option is highlighted with a blue background.
 *
 * @example
 * <RadioGroup
 *   options={[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]}
 *   value={selectedValue}
 *   onChange={handleValueChange}
 *   name="exampleRadioGroup"
 * />
 */
function RadioGroup<T extends string>(props: RadioGroupProps<T>) {
  const { options, value, onChange, name, className = '' } = props;

  return (
    <RadixRadioGroup.Root
      value={value}
      onValueChange={onChange}
      name={name}
      className={`flex justify-start gap-4 ${className}`}
    >
      {options.map((option) => (
        <div key={option.value}>
          <RadixRadioGroup.Item
            value={option.value}
            id={`${name}-${option.value}`}
            className="hidden"
          >
            <RadixRadioGroup.Indicator />
          </RadixRadioGroup.Item>
          <label
            htmlFor={`${name}-${option.value}`}
            className={`inline-flex items-center px-3 text-sm py-1 rounded-md cursor-pointer ${value === option.value ? 'bg-blue-12 text-blue-1' : 'bg-slate-100 text-slate-600'}`}
          >
            {option.label}
          </label>
        </div>
      ))}
    </RadixRadioGroup.Root>
  );
}

export default RadioGroup;
