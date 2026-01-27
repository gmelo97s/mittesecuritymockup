import mitteLogo from "@/assets/mitte-logo.png";

interface MitteLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8",
  md: "h-12",
  lg: "h-20",
};

export function MitteLogo({ size = "md", className = "" }: MitteLogoProps) {
  return (
    <img
      src={mitteLogo}
      alt="MITTE"
      className={`${sizeClasses[size]} w-auto object-contain ${className}`}
    />
  );
}
