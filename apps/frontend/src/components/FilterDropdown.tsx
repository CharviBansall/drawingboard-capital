import React, { useState, useCallback } from 'react';
import { Check, ListFilter } from 'lucide-react';
import { DropdownMenu } from 'radix-ui';

/**
 * Interface for filter option structure
 */
export interface FilterOption {
  /** Unique identifier for the filter category */
  category: string;
  /** Display name shown in the UI */
  displayName: string;
  /** Available options for this filter category */
  options: string[];
}

/**
 * Props for the FilterDropdown component
 */
export interface FilterDropdownProps {
  /** Array of filter options to display */
  filterOptions: FilterOption[];
  /** Current count of active filters */
  filterCount?: number;
  /** Currently selected filters organized by category */
  selectedFilters: Record<string, string[]>;
  /** Callback function when a filter is toggled */
  onFilterToggle: (category: string, option: string) => void;
  /** Custom trigger button text (default: "Filters") */
  triggerText?: string;
  /** Custom trigger icon (default: ListFilter icon) */
  triggerIcon?: React.ReactNode;
  /** Additional CSS classes for the trigger button */
  triggerClassName?: string;
  /** Whether to show the filter count badge */
  showFilterCount?: boolean;
}

/**
 * A reusable dropdown component for selecting filters from categorized options.
 * 
 * This component displays a dropdown menu with filter categories and checkable options.
 * It maintains its own open/close state and calls the provided callback when filters are toggled.
 * 
 * @example
 * <FilterDropdown
 *   filterOptions={[
 *     { category: 'type', displayName: 'Fund Type', options: ['Venture', 'Growth', 'Buyout'] }
 *   ]}
 *   selectedFilters={{ type: ['Venture'] }}
 *   onFilterToggle={(category, option) => handleFilterToggle(category, option)}
 * />
 */
function FilterDropdown({
  filterOptions,
  filterCount = 0,
  selectedFilters,
  onFilterToggle,
  triggerText = 'Filters',
  triggerIcon = <ListFilter size={15} />,
  triggerClassName = '',
  showFilterCount = true,
}: FilterDropdownProps) {
  // State to control dropdown open state
  const [open, setOpen] = useState(false);

  // Check if a filter option is selected
  const isFilterSelected = useCallback(
    (category: string, option: string) => {
      return selectedFilters[category]?.includes(option) || false;
    },
    [selectedFilters]
  );

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          className={`rounded-full font-medium text-blue-9 w-fit flex flex-row 
          items-center gap-1 px-3 py-1 text-sm 
          bg-blue-4 hover:bg-blue-5 transition-all ${triggerClassName}`}
        >
          {triggerIcon}
          {triggerText} {showFilterCount && filterCount > 0 && `(${filterCount})`}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="bottom"
          sideOffset={5}
          align="start"
          onCloseAutoFocus={(event) => event.preventDefault()}
          className="min-w-36 w-full rounded-md border text-sm border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-slate-900"
        >
          {filterOptions.map((filterOption) => (
            <div key={filterOption.category}>
              <DropdownMenu.Group>
                <DropdownMenu.Sub>
                  <DropdownMenu.SubTrigger className="px-2 py-0.5 gap-1 items-center flex flex-row focus:outline-none hover:bg-blue-3 text-blue-12 rounded-sm">
                    {filterOption.displayName}
                  </DropdownMenu.SubTrigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.SubContent
                      sideOffset={8}
                      className="min-w-36 rounded-md border text-sm border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-slate-900"
                    >
                      {filterOption.options.map((option: string) => (
                        <DropdownMenu.CheckboxItem
                          className="px-2 py-0.5 gap-1 items-center flex flex-row focus:outline-none hover:bg-blue-3 text-blue-12 rounded-sm"
                          key={option}
                          checked={isFilterSelected(
                            filterOption.category,
                            option,
                          )}
                          onCheckedChange={() => {
                            onFilterToggle(filterOption.category, option);
                          }}
                        >
                          <div className="h-4 w-4 flex items-center justify-center rounded-xs border border-blue-10">
                            <DropdownMenu.ItemIndicator className="p-0">
                              <Check
                                size={13}
                                className="text-white rounded-xs bg-blue-12"
                              />
                            </DropdownMenu.ItemIndicator>
                          </div>
                          {option}
                        </DropdownMenu.CheckboxItem>
                      ))}
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Sub>
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
            </div>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default FilterDropdown;
