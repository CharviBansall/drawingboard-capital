import type { Meta, StoryObj } from '@storybook/react';
import Sparkline from '../Sparkline';

const meta = {
  title: 'Components/Sparkline',
  component: Sparkline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description:
        'Array of numeric data points to be displayed in the sparkline',
    },
    width: {
      control: { type: 'number', min: 50, max: 500 },
      description: 'Width of the sparkline SVG in pixels',
    },
    height: {
      control: { type: 'number', min: 20, max: 200 },
      description: 'Height of the sparkline SVG in pixels',
    },
    strokeColor: {
      control: 'color',
      description: 'Color of the sparkline path',
    },
    strokeWidth: {
      control: { type: 'number', min: 0.5, max: 5, step: 0.5 },
      description: 'Width of the sparkline path in pixels',
    },
    margin: {
      control: 'object',
      description: 'Margin around the sparkline content',
    },
  },
  args: {
    data: [5, 10, 5, 20, 8, 15, 12, 18, 9, 14],
    width: 150,
    height: 40,
    strokeColor: 'steelblue',
    strokeWidth: 1.5,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  },
} satisfies Meta<typeof Sparkline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    data: [
      4, 8, 15, 16, 23, 42, 38, 25, 15, 12, 9, 17, 25, 32, 40, 35, 28, 20, 15,
      10,
    ],
    width: 300,
    height: 80,
    strokeColor: '#1976d2',
    strokeWidth: 2,
  },
};

export const Small: Story = {
  args: {
    data: [3, 6, 9, 8, 7, 10, 12, 10, 9, 8],
    width: 100,
    height: 25,
    strokeColor: '#4caf50',
    strokeWidth: 1,
  },
};

export const Volatile: Story = {
  args: {
    data: [10, 40, 5, 45, 10, 50, 15, 45, 5, 35],
    width: 200,
    height: 50,
    strokeColor: '#f44336',
    strokeWidth: 1.5,
    margin: { top: 2, right: 2, bottom: 2, left: 2 },
  },
};

export const CustomStyling: Story = {
  args: {
    data: [8, 12, 9, 16, 20, 18, 22, 25, 18, 15, 22, 28],
    width: 180,
    height: 45,
    strokeColor: '#9c27b0',
    strokeWidth: 2.5,
    margin: { top: 5, right: 5, bottom: 5, left: 5 },
  },
};

export const MultipleSparklines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>Revenue:</span>
        <Sparkline
          data={[5, 10, 15, 20, 15, 25, 30, 25, 20, 25, 30, 35]}
          width={100}
          height={30}
          strokeColor="#4caf50"
        />
        <span>+12%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>Users:</span>
        <Sparkline
          data={[10, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]}
          width={100}
          height={30}
          strokeColor="#2196f3"
        />
        <span>+24%</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span>Costs:</span>
        <Sparkline
          data={[30, 25, 35, 20, 30, 35, 25, 30, 20, 15, 20, 15]}
          width={100}
          height={30}
          strokeColor="#f44336"
        />
        <span>-5%</span>
      </div>
    </div>
  ),
};
