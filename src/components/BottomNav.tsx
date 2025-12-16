import { Home, BookOpen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

type TabId = "home" | "lessons" | "achievements" | "profile";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: "home" as const, icon: Home, label: "Home" },
  { id: "lessons" as const, icon: BookOpen, label: "Learn" },
  { id: "achievements" as const, icon: Trophy, label: "Rewards" },
  { id: "profile" as const, icon: User, label: "Profile" },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50 px-4 py-2 pb-safe">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-xl transition-all duration-200",
                  isActive && "gradient-primary shadow-button"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-all",
                    isActive && "text-primary-foreground"
                  )}
                />
              </div>
              <span className="text-[10px] font-display font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
