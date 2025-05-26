import { Meta, StoryObj } from '@storybook/react';
import PageTitle from '@/components/PageTitle';

/**
 * `PageTitle` is a consistent heading component used across the application
 * to maintain visual hierarchy and styling consistency.
 */
const meta = {
  title: 'Components/PageTitle',
  component: PageTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title text to display',
    },
    className: {
      control: 'text',
      description: 'Optional additional className to apply custom styling',
    },
  },
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default usage of the PageTitle component with standard styling.
 */
export const Default: Story = {
  args: {
    title: 'Page Title',
  },
};

/**
 * PageTitle with custom styling applied through className prop.
 */
export const WithCustomStyling: Story = {
  args: {
    title: 'Custom Styled Title',
    className: 'text-blue-600 pb-8',
  },
};

/**
 * PageTitle with a longer title text to demonstrate text wrapping behavior.
 */
export const LongTitle: Story = {
  args: {
    title:
      'This is a very long page title that might wrap to multiple lines on smaller screens',
  },
};
