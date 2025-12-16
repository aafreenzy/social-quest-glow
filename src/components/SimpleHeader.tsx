import { Sparkles } from "lucide-react";

interface SimpleHeaderProps {
  name: string;
}

export function SimpleHeader({ name }: SimpleHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-lg border-b border-border/50 px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {/* Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-card">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-foreground">SocialSkills</span>
        </div>

        {/* User avatar */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-body">Hey, {name}</span>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm">😊</span>
          </div>
        </div>
      </div>
    </header>
  );
}