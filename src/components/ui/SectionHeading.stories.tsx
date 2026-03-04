import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeading } from "./SectionHeading";

const meta: Meta<typeof SectionHeading> = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const WithLabel: Story = {
  args: {
    label: "Hizmetler",
    title: "Dijital Dunyanizi Insa Ediyoruz",
    description: "Modern web teknolojileri ile isletmenizi dijital dunyada one cikariyoruz.",
  },
};

export const WithoutLabel: Story = {
  args: {
    title: "Neden Bizi Secmelisiniz?",
    description: "Deneyimli ekibimiz ile projelerinizi hayata geciriyoruz.",
  },
};

export const LeftAligned: Story = {
  args: {
    label: "Hakkimizda",
    title: "Tutkuyla Calisan Bir Ekip",
    description: "Her projede en iyi sonucu elde etmek icin calisiyoruz.",
    align: "left",
  },
};
