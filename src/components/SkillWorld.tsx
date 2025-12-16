import { cn } from "@/lib/utils";
import { Check, ChevronRight } from "lucide-react";

interface Skill {
  id: string;
  title: string;
  emoji: string;
  lessonsTotal: number;
  lessonsCompleted: number;
  isUnlocked: boolean;
  isCurrent: boolean;
}

interface SkillWorldProps {
  skills: Skill[];
  onSkillClick: (skillId: string) => void;
}

export function SkillWorld({ skills, onSkillClick }: SkillWorldProps) {
  return (
    <div className="space-y-3">
      {skills.map((skill, index) => {
        const progress = skill.lessonsTotal > 0 
          ? (skill.lessonsCompleted / skill.lessonsTotal) * 100 
          : 0;
        const isComplete = progress === 100;

        return (
          <button
            key={skill.id}
            onClick={() => skill.isUnlocked && onSkillClick(skill.id)}
            disabled={!skill.isUnlocked}
            className={cn(
              "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left animate-slide-up",
              skill.isCurrent && "bg-primary/10 border-2 border-primary shadow-card",
              skill.isUnlocked && !skill.isCurrent && "bg-card border border-border/50 hover:border-primary/30 hover:shadow-card",
              !skill.isUnlocked && "bg-muted/30 opacity-60 cursor-not-allowed"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Emoji Icon */}
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-all",
              skill.isCurrent && "gradient-primary shadow-glow",
              skill.isUnlocked && !skill.isCurrent && "bg-muted",
              !skill.isUnlocked && "bg-muted/50 grayscale"
            )}>
              {skill.emoji}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={cn(
                  "font-display font-bold text-base",
                  skill.isUnlocked ? "text-foreground" : "text-muted-foreground"
                )}>
                  {skill.title}
                </h3>
                {isComplete && (
                  <div className="w-5 h-5 rounded-full bg-success flex items-center justify-center">
                    <Check className="w-3 h-3 text-success-foreground" />
                  </div>
                )}
              </div>
              
              {skill.isUnlocked && (
                <>
                  {/* Progress bar */}
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isComplete ? "bg-success" : "bg-primary"
                      )}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {skill.lessonsCompleted}/{skill.lessonsTotal} practiced
                  </p>
                </>
              )}
              
              {!skill.isUnlocked && (
                <p className="text-xs text-muted-foreground">
                  Complete previous skills to unlock
                </p>
              )}
            </div>

            {/* Arrow */}
            {skill.isUnlocked && (
              <ChevronRight className={cn(
                "w-5 h-5 flex-shrink-0",
                skill.isCurrent ? "text-primary" : "text-muted-foreground"
              )} />
            )}
          </button>
        );
      })}
    </div>
  );
}