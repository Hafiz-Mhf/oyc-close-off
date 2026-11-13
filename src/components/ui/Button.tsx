import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "surface" | "quiet";
type ButtonSize = "sm" | "md" | "lg" | "icon";
type ButtonShape = "rounded" | "pill";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-oyc-cyan bg-oyc-cyan text-oyc-navy-deep shadow-[0_10px_28px_-6px_rgb(0_229_237/38%)] enabled:hover:border-oyc-cyan-soft enabled:hover:bg-oyc-cyan-soft enabled:hover:shadow-[0_12px_32px_-4px_rgb(118_247_251/48%)] enabled:active:bg-oyc-cyan-soft",
  secondary:
    "border-oyc-border bg-white/5 text-oyc-text enabled:hover:border-oyc-cyan/70 enabled:hover:bg-white/10 enabled:active:bg-white/15",
  surface:
    "border-white/15 bg-white/6 text-oyc-cyan enabled:hover:border-oyc-cyan/70 enabled:hover:bg-oyc-cyan/12 enabled:hover:text-oyc-cyan-soft enabled:active:bg-oyc-cyan/18",
  quiet:
    "border-transparent bg-transparent text-oyc-text-muted enabled:hover:bg-white/8 enabled:hover:text-white enabled:active:bg-white/12",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-3.5 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-7 py-3 text-sm tablet:min-h-14 tablet:text-base",
  icon: "min-h-11 min-w-11 p-0 text-base",
};

const shapes: Record<ButtonShape, string> = {
  rounded: "rounded-xl",
  pill: "rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "rounded",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps, ref) {
  return (
    <button
      ref={ref}
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 border font-bold transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out enabled:active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 ${sizes[size]} ${shapes[shape]} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
