import { Lightbulb, ArrowRight } from "lucide-react";

interface MicroNudgeProps {
  title: string;
  description: string;
  onTry?: () => void;
}

export function MicroNudge({ title, description, onTry }: MicroNudgeProps) {
  return (
    <div className="bg-card/60 backdrop-blur rounded-2xl p-4 border border-border/30">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-warning" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-foreground text-sm mb-0.5">
            {title}
          </p>
          <p className="text-xs text-muted-foreground font-body">
            {description}
          </p>
        </div>
        {onTry && (
          <button 
            onClick={onTry}
            className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline flex-shrink-0"
          >
            Try it
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}