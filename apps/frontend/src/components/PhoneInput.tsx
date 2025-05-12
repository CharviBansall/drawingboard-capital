import { useState } from 'react';
import PhoneInputComponent from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Import default styles
import { Label } from 'radix-ui';

export default function PhoneInput({
  label = 'Phone Number',
  value: propValue,
  onChange: propOnChange,
  className = '',
}: {
  label?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
}) {
  const [value, setValue] = useState<string | undefined>(propValue);
  const [isFocused, setIsFocused] = useState(false);
  const [wasActivated, setWasActivated] = useState(false);

  const isActive = isFocused || wasActivated;

  return (
    <div
      className={`relative bg-blue-9 text-white border border-slate-700 focus-within:border-slate-500 rounded-md p-2 h-14 ${className}`}
    >
      <Label.Root
        className={`absolute transition-all duration-200 ${
          isActive
            ? 'transform text-xs -translate-y-0 text-slate-400'
            : 'transform translate-y-2 text-slate-400'
        }`}
      >
        {label}
      </Label.Root>
      <PhoneInputComponent
        value={value}
        onFocus={() => {
          setIsFocused(true);
          setWasActivated(true);
        }}
        onBlur={() => setIsFocused(false)}
        international={true}
        focusInputOnCountrySelection={true}
        addInternationalOption={false}
        countryCallingCodeEditable={false}
        defaultCountry="US"
        countries={['AU', 'US', 'GB', 'CA', 'IN', 'AE']}
        placeholder="Enter phone number"
        onChange={(value) => {
          propOnChange?.(value);
          setValue(value);
        }}
        className={`w-full flex flex-row gap-2 items-center mt-4 focus:outline-none text-white ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`}
        inputComponent={(props) => (
          <input
            {...props}
            className={`w-full focus:outline-none text-white ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      />
    </div>
  );
}
