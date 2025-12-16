import { TrendingUp, Calendar } from "lucide-react";

interface GrowthCardProps {
  practiceStreak: number;
  totalPracticed: number;
  skillsExplored: number;
}

export function GrowthCard({ practiceStreak, totalPracticed, skillsExplored }: GrowthCardProps) {
  return (
    <div className="bg-card rounded-2xl p-5 border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-success" />
        <h3 className="font-display font-bold text-foreground">Your Growth</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="font-display font-black text-2xl text-primary">{practiceStreak}</p>
          <p className="text-xs text-muted-foreground">days practicing</p>
        </div>
        <div>
          <p className="font-display font-black text-2xl text-secondary">{totalPracticed}</p>
          <p className="text-xs text-muted-foreground">scenarios tried</p>
        </div>
        <div>
          <p className="font-display font-black text-2xl text-accent">{skillsExplored}</p>
          <p className="text-xs text-muted-foreground">skills explored</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4 pt-4 border-t border-border/50">
        Every practice session counts. Keep showing up. 🌱
      </p>
    </div>
  );
}