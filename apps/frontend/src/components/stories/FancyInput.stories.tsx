import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FancyInput from '@/components/FancyInput';

const meta = {
  title: 'Components/FancyInput',
  component: FancyInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label text displayed for the input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Type of the input field',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the input container',
    },
  },
  args: {
    label: 'Input Label',
    type: 'text',
    placeholder: 'Type something...',
    disabled: false,
    required: false,
    value: '',
    onChange: fn(),
  },
} satisfies Meta<typeof FancyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default state of the FancyInput component
 */
export const Default: Story = {};

/**
 * FancyInput with a pre-filled value
 */
export const WithValue: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'user@example.com',
    placeholder: 'Type something...',
    onChange: fn(),
  },
};

/**
 * FancyInput in disabled state
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    type: 'text',
    disabled: true,
    value: 'Cannot edit this',
    placeholder: 'Type something...',
    onChange: fn(),
  },
};

/**
 * FancyInput configured as a password field
 */
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password...',
    onChange: fn(),
  },
};

/**
 * FancyInput with custom styling
 */
export const CustomStyling: Story = {
  args: {
    label: 'Custom Styled Input',
    type: 'text',
    placeholder: 'Type something...',
    className: 'border-2 border-purple-500 bg-blue-950',
    onChange: fn(),
  },
};

/**
 * FancyInput configured as a required field
 */
export const Required: Story = {
  args: {
    label: 'Required Field',
    type: 'text',
    placeholder: 'Type something...',
    required: true,
    onChange: fn(),
  },
};
