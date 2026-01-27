import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "pink" | "cyan" | "outline" | "success" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
}

const variantClasses = {
  pink: "btn-neon-pink",
  cyan: "btn-neon-cyan",
  outline: "btn-outline-pink",
  success: "bg-success text-success-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_hsl(142_76%_36%_/_0.5)] hover:-translate-y-0.5 font-orbitron",
  danger: "bg-destructive text-destructive-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_hsl(0_84%_60%_/_0.5)] hover:-translate-y-0.5 font-orbitron",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl w-full",
};

export const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ variant = "pink", size = "md", className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          disabled && "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeonButton.displayName = "NeonButton";
