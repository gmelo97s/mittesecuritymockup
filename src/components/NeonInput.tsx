import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface NeonInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const NeonInput = forwardRef<HTMLInputElement, NeonInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-muted-foreground uppercase tracking-wider font-orbitron">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "input-neon w-full text-base",
            error && "border-destructive focus:border-destructive",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

NeonInput.displayName = "NeonInput";
