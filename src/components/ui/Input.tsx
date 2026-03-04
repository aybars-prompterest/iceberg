import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit?: () => void;
  submitLabel?: string;
}

export function Input({ className, onSubmit, submitLabel = "Gonder", ...props }: InputProps) {
  return (
    <div className="flex items-center gap-0 rounded-xl border border-border bg-bg-surface overflow-hidden">
      <input className={cn("flex-1 bg-transparent px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary outline-none", className)} {...props} />
      {onSubmit && (
        <button onClick={onSubmit} className="px-4 py-3 bg-accent text-bg-primary text-sm font-medium hover:bg-accent-hover transition-colors">
          {submitLabel}
        </button>
      )}
    </div>
  );
}
