import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "primary" | "success" | "accent" | "warning";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function ProgressBar({
  value,
  max,
  label,
  showPercentage = false,
  variant = "primary",
  size = "md",
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeStyles = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const variantStyles = {
    primary: "gradient-primary",
    success: "gradient-success",
    accent: "gradient-accent",
    warning: "bg-warning",
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-display font-bold text-foreground">{label}</span>
          )}
          {showPercentage && (
            <span className="text-xs font-bold text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variantStyles[variant],
            animated && "animate-[progress-fill_1s_ease-out]"
          )}
          style={{ width: `${percentage}%`, ["--progress-width" as string]: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
