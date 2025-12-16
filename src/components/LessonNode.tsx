import { cn } from "@/lib/utils";
import { Lock, Check, Star, Sparkles } from "lucide-react";

type LessonStatus = "locked" | "available" | "completed" | "current";

interface LessonNodeProps {
  title: string;
  icon: React.ReactNode;
  status: LessonStatus;
  xpReward: number;
  onClick?: () => void;
  delay?: number;
}

export function LessonNode({ title, icon, status, xpReward, onClick, delay = 0 }: LessonNodeProps) {
  const isClickable = status === "available" || status === "current";

  return (
    <button
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={cn(
        "relative flex flex-col items-center gap-2 transition-all duration-300 animate-slide-up",
        isClickable && "cursor-pointer hover:scale-110"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect for current */}
      {status === "current" && (
        <div className="absolute inset-0 -m-4 rounded-full animate-pulse-glow" />
      )}

      {/* Node circle */}
      <div
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
          status === "locked" && "bg-muted text-muted-foreground",
          status === "available" && "gradient-primary text-primary-foreground shadow-button",
          status === "current" && "gradient-accent text-accent-foreground shadow-button scale-110",
          status === "completed" && "gradient-success text-success-foreground shadow-success"
        )}
      >
        {status === "locked" ? (
          <Lock className="w-6 h-6" />
        ) : status === "completed" ? (
          <Check className="w-7 h-7 stroke-[3]" />
        ) : (
          <span className="text-2xl">{icon}</span>
        )}

        {/* Stars for completed */}
        {status === "completed" && (
          <div className="absolute -top-1 -right-1">
            <Star className="w-5 h-5 text-warning fill-warning" />
          </div>
        )}

        {/* Sparkle for current */}
        {status === "current" && (
          <div className="absolute -top-2 -right-2 animate-bounce-in">
            <Sparkles className="w-6 h-6 text-warning" />
          </div>
        )}
      </div>

      {/* Title */}
      <span
        className={cn(
          "text-xs font-display font-bold text-center max-w-20",
          status === "locked" && "text-muted-foreground",
          status === "available" && "text-foreground",
          status === "current" && "text-accent",
          status === "completed" && "text-success"
        )}
      >
        {title}
      </span>

      {/* XP badge */}
      {status !== "locked" && (
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full",
            status === "completed"
              ? "bg-success/20 text-success"
              : "bg-secondary/20 text-secondary"
          )}
        >
          +{xpReward} XP
        </span>
      )}
    </button>
  );
}
