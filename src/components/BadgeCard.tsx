import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface BadgeCardProps {
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const rarityStyles = {
  common: "bg-muted border-border",
  rare: "gradient-primary border-primary",
  epic: "gradient-accent border-accent",
  legendary: "bg-gradient-to-br from-warning via-highlight to-accent border-warning",
};

export function BadgeCard({ name, description, icon, isUnlocked, rarity }: BadgeCardProps) {
  return (
    <div
      className={cn(
        "relative p-4 rounded-2xl border-2 transition-all duration-300",
        isUnlocked ? rarityStyles[rarity] : "bg-muted/50 border-border",
        isUnlocked && "shadow-card hover:scale-105"
      )}
    >
      {/* Badge Icon */}
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3",
          isUnlocked ? "bg-card/30" : "bg-muted"
        )}
      >
        {isUnlocked ? (
          <span className="animate-bounce-in">{icon}</span>
        ) : (
          <Lock className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h3
          className={cn(
            "font-display font-bold text-sm",
            isUnlocked ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "text-xs mt-1",
            isUnlocked ? "text-primary-foreground/80" : "text-muted-foreground/60"
          )}
        >
          {description}
        </p>
      </div>

      {/* Rarity indicator */}
      {isUnlocked && (
        <div className="absolute -top-1 -right-1">
          <span
            className={cn(
              "inline-block w-3 h-3 rounded-full",
              rarity === "common" && "bg-muted-foreground",
              rarity === "rare" && "bg-secondary",
              rarity === "epic" && "bg-accent",
              rarity === "legendary" && "bg-warning animate-pulse"
            )}
          />
        </div>
      )}
    </div>
  );
}
