"use client";

interface HamburgerButtonProps {
  onClick: () => void;
}

export function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
      aria-label="Toggle menu"
    >
      <span className="w-5 h-0.5 bg-text-primary transition-transform" />
      <span className="w-5 h-0.5 bg-text-primary transition-opacity" />
      <span className="w-5 h-0.5 bg-text-primary transition-transform" />
    </button>
  );
}
