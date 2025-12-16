import { Timer, Gift, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { ProgressBar } from "./ProgressBar";

interface DailyChallengeProps {
  title: string;
  description: string;
  progress: number;
  goal: number;
  xpReward: number;
  timeLeft: string;
  onStart: () => void;
}

export function DailyChallenge({
  title,
  description,
  progress,
  goal,
  xpReward,
  timeLeft,
  onStart,
}: DailyChallengeProps) {
  const isComplete = progress >= goal;

  return (
    <div className="bg-card rounded-3xl p-5 shadow-card border border-border/50 animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl gradient-accent flex items-center justify-center shadow-button">
            <Gift className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-display font-bold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          <Timer className="w-3 h-3" />
          <span>{timeLeft}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar
          value={progress}
          max={goal}
          variant={isComplete ? "success" : "accent"}
          showPercentage
        />
        <p className="text-xs text-muted-foreground mt-2">
          {progress}/{goal} completed
        </p>
      </div>

      {/* Reward & Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10">
          <Sparkles className="w-4 h-4 text-warning" />
          <span className="text-sm font-bold text-warning">+{xpReward} XP</span>
        </div>
        <Button
          variant={isComplete ? "success" : "accent"}
          size="sm"
          onClick={onStart}
          disabled={isComplete}
        >
          {isComplete ? "Claimed!" : "Start"}
        </Button>
      </div>
    </div>
  );
}
