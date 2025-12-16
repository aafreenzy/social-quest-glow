import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check, Lightbulb, Sparkles, ArrowRight } from "lucide-react";

interface Choice {
  id: string;
  text: string;
  effectiveness: "good" | "okay" | "tricky";
  feedback: string;
}

interface ScenarioCardProps {
  scenario: string;
  context: string;
  emoji: string;
  choices: Choice[];
  onComplete: (wasEffective: boolean) => void;
}

export function ScenarioCard({ scenario, context, emoji, choices, onComplete }: ScenarioCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (choiceId: string) => {
    if (showFeedback) return;
    setSelectedChoice(choiceId);
  };

  const handleSubmit = () => {
    if (!selectedChoice) return;
    setShowFeedback(true);

    const choice = choices.find(c => c.id === selectedChoice);
    setTimeout(() => {
      onComplete(choice?.effectiveness === "good");
    }, 2000);
  };

  const selectedChoiceData = choices.find(c => c.id === selectedChoice);
  const effectiveness = selectedChoiceData?.effectiveness ?? "okay";

  const feedbackConfig = {
    good: {
      title: "Nice approach!",
      emoji: "✨",
      bgClass: "bg-success/10 border-success/20",
      textClass: "text-success",
    },
    okay: {
      title: "That could work!",
      emoji: "💭",
      bgClass: "bg-secondary/10 border-secondary/20",
      textClass: "text-secondary",
    },
    tricky: {
      title: "Something to think about",
      emoji: "🤔",
      bgClass: "bg-warning/10 border-warning/20",
      textClass: "text-warning",
    },
  };

  const config = feedbackConfig[effectiveness];

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Scenario Card */}
      <div className={cn(
        "bg-card rounded-2xl p-5 border border-border/50 mb-6 transition-all duration-300",
        showFeedback && "animate-bounce-in"
      )}>
        {/* Context Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          <span>{emoji}</span>
          <span>{context}</span>
        </div>

        {/* Scenario Text */}
        <p className="text-foreground font-body text-base leading-relaxed">
          {scenario}
        </p>
      </div>

      {/* Prompt text */}
      <p className="text-sm text-muted-foreground mb-4 font-body">
        What would you try? (No wrong answers here)
      </p>

      {/* Choice Buttons */}
      <div className="space-y-3 mb-6">
        {choices.map((choice, index) => (
          <Button
            key={choice.id}
            variant={selectedChoice === choice.id ? "choiceSelected" : "choice"}
            size="lg"
            className={cn(
              "w-full text-left justify-start h-auto py-4 px-4 animate-slide-up",
              showFeedback && choice.id === selectedChoice && effectiveness === "good" && "bg-success/10 border-success",
              showFeedback && choice.id === selectedChoice && effectiveness === "okay" && "bg-secondary/10 border-secondary",
              showFeedback && choice.id === selectedChoice && effectiveness === "tricky" && "bg-warning/10 border-warning"
            )}
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={() => handleSelect(choice.id)}
            disabled={showFeedback}
          >
            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1 font-body text-sm">{choice.text}</span>
            {showFeedback && choice.id === selectedChoice && effectiveness === "good" && (
              <Check className="w-5 h-5 text-success ml-2" />
            )}
            {showFeedback && choice.id === selectedChoice && effectiveness !== "good" && (
              <Lightbulb className="w-5 h-5 text-warning ml-2" />
            )}
          </Button>
        ))}
      </div>

      {/* Feedback Section */}
      {showFeedback && selectedChoiceData && (
        <div className={cn(
          "p-4 rounded-2xl mb-6 animate-slide-up border",
          config.bgClass
        )}>
          <div className="flex items-start gap-3">
            <span className="text-xl">{config.emoji}</span>
            <div>
              <p className={cn("font-display font-bold mb-1 text-sm", config.textClass)}>
                {config.title}
              </p>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">
                {selectedChoiceData.feedback}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit / Continue Button */}
      {!showFeedback ? (
        <Button
          variant="default"
          size="lg"
          className="w-full"
          onClick={handleSubmit}
          disabled={!selectedChoice}
        >
          See what happens
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button
          variant="default"
          size="lg"
          className="w-full"
        >
          Try another one
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
}