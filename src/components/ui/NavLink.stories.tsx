import type { Meta, StoryObj } from "@storybook/react";
import { NavLink } from "./NavLink";

const meta: Meta<typeof NavLink> = {
  title: "UI/NavLink",
  component: NavLink,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Anasayfa",
  },
};

export const Active: Story = {
  args: {
    href: "#",
    children: "Anasayfa",
    active: true,
  },
};

export const NavBar: Story = {
  render: () => (
    <nav className="flex gap-8">
      <NavLink href="#" active>Anasayfa</NavLink>
      <NavLink href="#">Hizmetler</NavLink>
      <NavLink href="#">Hakkimizda</NavLink>
      <NavLink href="#">Projeler</NavLink>
      <NavLink href="#">Blog</NavLink>
      <NavLink href="#">Iletisim</NavLink>
    </nav>
  ),
};
