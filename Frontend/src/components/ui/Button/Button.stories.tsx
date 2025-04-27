import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
    children: {
      control: "text",
    },
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "large",
    children: "Primary Button",
  },
};
