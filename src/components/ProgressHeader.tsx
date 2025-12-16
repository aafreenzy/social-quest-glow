import { Flame, Zap, Trophy, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressHeaderProps {
  xp: number;
  streak: number;
  hearts: number;
  level: number;
}

export function ProgressHeader({ xp, streak, hearts, level }: ProgressHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border/50 px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Level Badge */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-button">
              <span className="text-primary-foreground font-display font-bold text-sm">{level}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
              <Trophy className="w-3 h-3 text-warning-foreground" />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-highlight/10",
            streak > 0 && "animate-streak-fire"
          )}>
            <Flame className="w-5 h-5 text-highlight" />
            <span className="font-display font-bold text-highlight">{streak}</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10">
            <Zap className="w-5 h-5 text-secondary" />
            <span className="font-display font-bold text-secondary">{xp}</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10">
            <Heart className="w-5 h-5 text-accent fill-accent" />
            <span className="font-display font-bold text-accent">{hearts}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
