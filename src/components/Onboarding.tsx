import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowRight, MessageCircle, Sparkles, Heart } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const screens = [
  {
    emoji: "👋",
    title: "Hey there!",
    subtitle: "Welcome to your social skills playground",
    description: "This is practice, not performance. There's no wrong way to learn here.",
    accent: "No judgment. Just growth.",
  },
  {
    emoji: "🎯",
    title: "One skill at a time",
    subtitle: "Small steps, real progress",
    description: "Practice real-world situations in a safe space. Mess up, try again, figure it out.",
    accent: "Messy answers are still answers.",
  },
  {
    emoji: "🌱",
    title: "Your pace, your path",
    subtitle: "No pressure here",
    description: "Take breaks whenever. Come back whenever. We'll be here.",
    accent: "Ready when you are.",
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const screen = screens[currentScreen];
  const isLast = currentScreen === screens.length - 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {/* Progress dots */}
      <div className="flex gap-2 mb-12">
        {screens.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentScreen 
                ? "w-8 bg-primary" 
                : i < currentScreen 
                  ? "w-2 bg-primary/50" 
                  : "w-2 bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center max-w-sm animate-slide-up" key={currentScreen}>
        {/* Emoji */}
        <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center text-5xl mb-8 shadow-glow animate-float">
          {screen.emoji}
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-3xl text-foreground mb-2">
          {screen.title}
        </h1>
        
        {/* Subtitle */}
        <p className="font-display font-semibold text-lg text-primary mb-4">
          {screen.subtitle}
        </p>

        {/* Description */}
        <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
          {screen.description}
        </p>

        {/* Accent text */}
        <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-semibold text-primary">{screen.accent}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-12 w-full max-w-sm">
        <Button
          variant="default"
          size="xl"
          className="w-full"
          onClick={handleNext}
        >
          {isLast ? "Let's go" : "Next"}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>

        {!isLast && (
          <button
            className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={onComplete}
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
}