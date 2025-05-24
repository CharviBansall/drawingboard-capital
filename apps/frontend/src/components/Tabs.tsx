import { Tabs as RadixTabs } from 'radix-ui';

/**
 * Interface for individual tab items
 */
interface TabItem<T extends string> {
  /** Unique value for the tab */
  value: T;
  /** Display label for the tab */
  label: string;
  /** Optional icon component to display in the tab */
  icon?: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
}

/**
 * Props for the Tabs component
 */
interface TabsProps<T extends string> {
  /** Array of tab items to display */
  tabs: TabItem<T>[];

  /** Currently selected tab value */
  value: T;

  /**
   * Callback function when tab selection changes
   * @param value - The newly selected tab value
   */
  onChange: (value: T) => void;

  /** Additional CSS classes to apply to the container */
  className?: string;

  /** Additional CSS classes to apply to the tab list */
  tabListClassName?: string;

  /** Additional CSS classes to apply to the content */
  contentClassName?: string;

  /** Content to display for the selected tab */
  children?: React.ReactNode;
}

/**
 * Tabs component using Radix UI primitives with custom styling
 *
 * Renders a horizontal tab list with custom styling where the selected
 * tab is highlighted with a blue bottom border.
 *
 * @example
 * <Tabs
 *   tabs={[
 *     { value: 'tab1', label: 'Tab 1' },
 *     { value: 'tab2', label: 'Tab 2' }
 *   ]}
 *   value={selectedTab}
 *   onChange={handleTabChange}
 * >
 *   {selectedTab === 'tab1' && <div>Content for Tab 1</div>}
 *   {selectedTab === 'tab2' && <div>Content for Tab 2</div>}
 * </Tabs>
 */
function Tabs<T extends string>(props: TabsProps<T>) {
  const {
    tabs,
    value,
    onChange,
    className = '',
    tabListClassName = '',
    contentClassName = '',
    children,
  } = props;

  return (
    <RadixTabs.Root
      value={value}
      onValueChange={(newValue) => onChange(newValue as T)}
      className={`w-full ${className}`}
    >
      <RadixTabs.List className={`flex mb-4 ${tabListClassName}`}>
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={`inline-flex items-center px-3 py-1 border-b-2 text-sm transition-colors ${tab.disabled ? 'cursor-not-allowed opacity-40 border-transparent' : value === tab.value ? 'cursor-pointer' : 'cursor-pointer border-transparent opacity-60 hover:bg-slate-200'}`}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      <RadixTabs.Content value={value} className={`${contentClassName}`}>
        {children}
      </RadixTabs.Content>
    </RadixTabs.Root>
  );
}

export default Tabs;
