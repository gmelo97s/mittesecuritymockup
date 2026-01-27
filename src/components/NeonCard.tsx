import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "pink" | "cyan" | "none";
}

export function NeonCard({ children, className, glowColor = "none" }: NeonCardProps) {
  const glowClasses = {
    pink: "neon-border-pink",
    cyan: "neon-border-cyan",
    none: "",
  };

  return (
    <div className={cn("card-neon p-6", glowClasses[glowColor], className)}>
      {children}
    </div>
  );
}
