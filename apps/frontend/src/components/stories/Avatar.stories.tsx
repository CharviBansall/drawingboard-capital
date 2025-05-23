import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '@/components/Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'The size of the avatar',
    },
    src: {
      control: 'text',
      description: 'The source URL for the avatar image',
    },
    alt: {
      control: 'text',
      description: 'The alt text for the avatar image',
    },
    initials: {
      control: 'text',
      description: 'The initials to display when no image is provided',
    },
  },
  args: {
    size: 'md',
    initials: 'JD',
    alt: 'User avatar',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    alt: 'User profile picture',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'DB',
  },
};

export const CustomInitials: Story = {
  args: {
    initials: 'AC',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" initials="SM" />
      <Avatar size="md" initials="MD" />
      <Avatar size="lg" initials="LG" />
    </div>
  ),
};
