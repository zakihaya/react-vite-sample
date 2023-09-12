// src/components/Input.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import ButtonComponent from "./Button";

const meta = {
  component: ButtonComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonComponent>;

export default meta;

type Story = StoryObj<typeof ButtonComponent>;

export const ButtonComponent1: Story = {
  args: {
    text: "Button1",
    backgroundColor: "white",
  },
  parameters: {
    docs: {
      description: {
        story: "シンプルなボタン",
      },
    },
  },
};

export const AlertButtonComponent: Story = {
  args: {
    text: "Click me!",
    onClick: () => {
      alert("alert");
    },
  },
  parameters: {
    docs: {
      description: {
        story: "クリックするとアラートが出るボタン",
      },
    },
  },
};

export const ColoredButtonComponent: Story = {
  args: {
    text: "Yellow Button",
    backgroundColor: "yellow",
    onClick: () => {
      alert("alert");
    },
  },
  parameters: {
    docs: {
      description: {
        story: "色付きのボタン",
      },
    },
  },
};
