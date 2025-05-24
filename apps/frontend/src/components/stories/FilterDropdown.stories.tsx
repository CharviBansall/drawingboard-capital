import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { fn } from '@storybook/test';
import FilterDropdown, { FilterOption } from '../FilterDropdown';
import { Filter, ListFilter, Sliders } from 'lucide-react';

// Sample filter options for the stories
const sampleFilterOptions: FilterOption[] = [
  {
    category: 'type',
    displayName: 'Fund Type',
    options: ['Venture', 'Growth', 'Buyout', 'Seed'],
  },
  {
    category: 'region',
    displayName: 'Region',
    options: ['North America', 'Europe', 'Asia', 'Africa', 'South America', 'Australia'],
  },
  {
    category: 'size',
    displayName: 'Fund Size',
    options: ['Small (<$50M)', 'Medium ($50M-$250M)', 'Large ($250M-$1B)', 'Mega (>$1B)'],
  },
];

const meta = {
  title: 'Components/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    filterOptions: {
      description: 'Array of filter options to display',
      control: 'object',
    },
    filterCount: {
      description: 'Current count of active filters',
      control: 'number',
    },
    selectedFilters: {
      description: 'Currently selected filters organized by category',
      control: 'object',
    },
    onFilterToggle: {
      description: 'Callback function when a filter is toggled',
      action: 'filter toggled',
    },
    triggerText: {
      description: 'Custom trigger button text',
      control: 'text',
    },
    triggerIcon: {
      control: 'select',
      options: ['filter', 'sliders', 'listFilter'],
      mapping: {
        filter: <Filter size={15} />,
        sliders: <Sliders size={15} />,
        listFilter: <ListFilter size={15} />,
      },
      description: 'Icon to display in the trigger button',
    },
    triggerClassName: {
      description: 'Additional CSS classes for the trigger button',
      control: 'text',
    },
    showFilterCount: {
      description: 'Whether to show the filter count badge',
      control: 'boolean',
    },
  },
  args: {
    filterOptions: sampleFilterOptions,
    filterCount: 0,
    selectedFilters: {},
    onFilterToggle: fn(),
    triggerText: 'Filters',
    showFilterCount: true,
  },
} satisfies Meta<typeof FilterDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive wrapper component for demonstrating FilterDropdown with state management
 */
function InteractiveFilterDropdown() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    type: ['Venture'],
    region: ['North America'],
  });

  // Calculate filter count
  const filterCount = Object.values(selectedFilters).reduce(
    (count, options) => count + options.length,
    0
  );

  // Handle filter toggle
  const handleFilterToggle = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const prevSelected = prev[category] || [];

      // If already selected, remove it
      if (prevSelected.includes(option)) {
        const newSelected = prevSelected.filter((item) => item !== option);

        // If category now has no selected options, remove the category
        if (newSelected.length === 0) {
          const { [category]: _, ...rest } = prev;
          return rest;
        }

        // Otherwise update the category's selected options
        return { ...prev, [category]: newSelected };
      }

      // If not selected, add it
      return {
        ...prev,
        [category]: [...prevSelected, option],
      };
    });
  };

  return (
    <div className="p-6 border border-gray-200 rounded-md bg-white max-w-md">
      <h3 className="mb-4 text-sm font-medium text-gray-500">
        Selected filters: 
        <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs font-mono">
          {JSON.stringify(selectedFilters)}
        </span>
      </h3>
      <FilterDropdown
        filterOptions={sampleFilterOptions}
        filterCount={filterCount}
        selectedFilters={selectedFilters}
        onFilterToggle={handleFilterToggle}
      />
    </div>
  );
}

/**
 * Default story showing basic usage with interactive state
 */
export const Interactive: Story = {
  render: () => <InteractiveFilterDropdown />,
  parameters: {
    docs: {
      description: {
        story: 'An interactive example of the FilterDropdown component with state management. Try clicking on the filter options to see how the component behaves.',
      },
    },
  },
};

/**
 * Default state of the FilterDropdown component
 */
export const Default: Story = {};

/**
 * FilterDropdown with pre-selected filters
 */
export const WithSelectedFilters: Story = {
  args: {
    selectedFilters: { type: ['Venture', 'Growth'], region: ['Europe'] },
    filterCount: 3,
  },
};

/**
 * FilterDropdown with custom trigger text
 */
export const CustomTriggerText: Story = {
  args: {
    triggerText: 'Filter Options',
  },
};

/**
 * FilterDropdown with a custom icon
 */
export const CustomIcon: Story = {
  args: {
    triggerIcon: <Filter size={15} />,
  },
};

/**
 * FilterDropdown without a filter count badge
 */
export const WithoutFilterCount: Story = {
  args: {
    selectedFilters: { type: ['Venture'], region: ['Europe'] },
    filterCount: 2,
    showFilterCount: false,
  },
};

/**
 * FilterDropdown with custom styling
 */
export const CustomStyling: Story = {
  args: {
    triggerClassName: 'bg-green-4 hover:bg-green-5 text-green-9',
  },
};

/**
 * FilterDropdown with many filter options
 */
export const ManyOptions: Story = {
  args: {
    filterOptions: [
      ...sampleFilterOptions,
      {
        category: 'stage',
        displayName: 'Investment Stage',
        options: ['Early', 'Mid', 'Late', 'Pre-IPO', 'Public'],
      },
      {
        category: 'sector',
        displayName: 'Sector',
        options: ['Technology', 'Healthcare', 'Finance', 'Consumer', 'Industrial', 'Energy', 'Real Estate'],
      },
    ],
  },
};
