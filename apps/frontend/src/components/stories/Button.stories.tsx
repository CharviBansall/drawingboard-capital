import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '@/components/Button';
import { ArrowRight } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'ghost', 'destructive'],
      },
      description: 'The variant of the button',
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      description: 'The size of the button',
    },
    as: {
      control: {
        type: 'select',
        options: ['button', 'a', 'div', 'span'],
      },
      description: 'The element type to render as',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description:
        'Whether the button should take the full width of its container',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'small',
    isLoading: false,
    disabled: false,
    fullWidth: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span>Button with Icon</span>
        <ArrowRight />
      </>
    ),
  },
};

export const AsLink: Story = {
  args: {
    as: 'a',
    href: '#',
    children: 'Link Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button can be rendered as different HTML elements using the `as` prop. This example shows a button rendered as an anchor (`<a>`) tag.',
      },
    },
  },
};

export const AsDiv: Story = {
  args: {
    as: 'div',
    children: 'Div Button',
    variant: 'secondary',
    onClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button can be rendered as a `<div>` element. This is useful when you need to avoid nested button elements, such as when placing a button inside another interactive element.',
      },
    },
  },
};
