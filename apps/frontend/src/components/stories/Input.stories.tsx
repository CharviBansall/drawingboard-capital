import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Input from '@/components/Input';
import { Search, Mail, User } from 'lucide-react';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'The placeholder text for the input',
    },
    icon: {
      control: 'select',
      options: ['none', 'search', 'mail', 'user'],
      mapping: {
        none: null,
        search: <Search className="w-5 h-5 text-gray-500" />,
        mail: <Mail className="w-5 h-5 text-gray-500" />,
        user: <User className="w-5 h-5 text-gray-500" />,
      },
      description: 'Icon to display at the start of the input',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Whether to show a clear button when the input has a value',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the input container',
    },
  },
  args: {
    placeholder: 'Search...',
    value: '',
    onChange: fn(),
    onClear: fn(),
    showClearButton: true,
    icon: <Search className="w-5 h-5 text-gray-500" />,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state of the Input component with search icon
 */
export const Default: Story = {};

/**
 * Input with a pre-filled value
 */
export const WithValue: Story = {
  args: {
    value: 'Search term',
  },
};

/**
 * Input without an icon
 */
export const WithoutIcon: Story = {
  args: {
    icon: undefined,
  },
};

/**
 * Input without a clear button
 */
export const WithoutClearButton: Story = {
  args: {
    showClearButton: false,
    value: 'Cannot clear this',
  },
};

/**
 * Input with mail icon
 */
export const WithMailIcon: Story = {
  args: {
    icon: <Mail className="w-5 h-5 text-gray-500" />,
    placeholder: 'Enter email address...',
  },
};

/**
 * Input with custom styling
 */
export const CustomStyling: Story = {
  args: {
    className: 'max-w-md border-2 border-blue-500 rounded-xl',
    placeholder: 'Custom styled input...',
  },
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
};
