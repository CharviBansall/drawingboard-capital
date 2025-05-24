import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RadioGroup from '../RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of radio options to display',
      control: 'object',
    },
    value: {
      description: 'Currently selected value',
      control: 'text',
    },
    onChange: {
      description: 'Callback function when selection changes',
      action: 'changed',
    },
    name: {
      description: 'Name attribute for the radio input group',
      control: 'text',
    },
    className: {
      description: 'Additional CSS classes to apply to the container',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

/**
 * Interactive example with state management
 */
function InteractiveRadioGroup(args: any) {
  const [selectedValue, setSelectedValue] = useState(args.value);
  
  return (
    <RadioGroup
      {...args}
      value={selectedValue}
      onChange={(value) => {
        setSelectedValue(value);
        args.onChange(value);
      }}
    />
  );
}

/**
 * Default example of the RadioGroup component showing region selection
 */
export const Default: Story = {
  args: {
    options: [
      { value: 'overview', label: 'Overview' },
      { value: 'usa', label: 'USA' },
      { value: 'india', label: 'India' },
    ],
    value: 'overview',
    name: 'regionSelection',
    className: '',
  },
  render: (args) => <InteractiveRadioGroup {...args} />,
};

/**
 * Example with more options and custom styling
 */
export const WithMoreOptions: Story = {
  args: {
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'yearly', label: 'Yearly' },
    ],
    value: 'monthly',
    name: 'timeframeSelection',
    className: 'mb-4',
  },
  render: (args) => <InteractiveRadioGroup {...args} />,
};

/**
 * Example showing custom styling with a different layout
 */
export const CustomStyling: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    value: 'option2',
    name: 'customStyledRadio',
    className: 'bg-gray-50 p-4 rounded-lg',
  },
  render: (args) => <InteractiveRadioGroup {...args} />,
};
