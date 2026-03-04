import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "E-posta adresinizi girin...",
  },
};

export const WithSubmit: Story = {
  args: {
    placeholder: "E-posta adresinizi girin...",
    onSubmit: () => alert("Gonderildi!"),
    submitLabel: "Abone Ol",
  },
};
