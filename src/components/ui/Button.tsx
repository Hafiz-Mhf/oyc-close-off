import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "quiet";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-oyc-cyan bg-oyc-cyan text-oyc-navy-deep hover:bg-oyc-cyan-soft active:bg-white",
  secondary:
    "border-oyc-border bg-white/5 text-oyc-text hover:border-oyc-cyan/70 hover:bg-white/10 active:bg-white/15",
  quiet: "border-transparent bg-transparent text-oyc-text-muted hover:bg-white/8 hover:text-white active:bg-white/12",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
