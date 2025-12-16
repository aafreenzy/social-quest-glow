import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check, X, Sparkles } from "lucide-react";

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
}

interface ScenarioCardProps {
  scenario: string;
  context: string;
  emoji: string;
  choices: Choice[];
  onComplete: (correct: boolean) => void;
}

export function ScenarioCard({ scenario, context, emoji, choices, onComplete }: ScenarioCardProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (choiceId: string) => {
    if (showFeedback) return;
    setSelectedChoice(choiceId);
  };

  const handleSubmit = () => {
    if (!selectedChoice) return;
    setShowFeedback(true);
    setIsAnimating(true);

    const choice = choices.find(c => c.id === selectedChoice);
    setTimeout(() => {
      onComplete(choice?.isCorrect ?? false);
    }, 2000);
  };

  const selectedChoiceData = choices.find(c => c.id === selectedChoice);
  const isCorrect = selectedChoiceData?.isCorrect ?? false;

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      {/* Scenario Card */}
      <div
        className={cn(
          "bg-card rounded-3xl p-6 shadow-card mb-6 transition-all duration-300",
          showFeedback && isCorrect && "animate-bounce-in border-2 border-success",
          showFeedback && !isCorrect && "animate-shake border-2 border-destructive"
        )}
      >
        {/* Context Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
          <span>{emoji}</span>
          <span>{context}</span>
        </div>

        {/* Scenario Text */}
        <p className="text-foreground font-body text-lg leading-relaxed mb-2">
          {scenario}
        </p>

        {/* Character illustration placeholder */}
        <div className="flex justify-center my-4">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center text-4xl animate-float shadow-glow">
            {emoji}
          </div>
        </div>
      </div>

      {/* Choice Buttons */}
      <div className="space-y-3 mb-6">
        {choices.map((choice, index) => (
          <Button
            key={choice.id}
            variant={selectedChoice === choice.id ? "choiceSelected" : "choice"}
            size="lg"
            className={cn(
              "w-full text-left justify-start h-auto py-4 px-5 animate-slide-up",
              showFeedback && choice.id === selectedChoice && isCorrect && "gradient-success border-success text-success-foreground",
              showFeedback && choice.id === selectedChoice && !isCorrect && "bg-destructive/10 border-destructive text-destructive"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleSelect(choice.id)}
            disabled={showFeedback}
          >
            <span className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1 font-body">{choice.text}</span>
            {showFeedback && choice.id === selectedChoice && (
              <span className="ml-2">
                {isCorrect ? (
                  <Check className="w-6 h-6 text-success-foreground animate-success-pop" />
                ) : (
                  <X className="w-6 h-6 text-destructive animate-wiggle" />
                )}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Feedback Section */}
      {showFeedback && selectedChoiceData && (
        <div
          className={cn(
            "p-4 rounded-2xl mb-6 animate-bounce-in",
            isCorrect ? "bg-success/10 border border-success/30" : "bg-destructive/10 border border-destructive/30"
          )}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">
              {isCorrect ? "🎉" : "💡"}
            </span>
            <div>
              <p className={cn(
                "font-display font-bold mb-1",
                isCorrect ? "text-success" : "text-destructive"
              )}>
                {isCorrect ? "Great job!" : "Almost there!"}
              </p>
              <p className="text-sm text-muted-foreground font-body">
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
          size="xl"
          className="w-full"
          onClick={handleSubmit}
          disabled={!selectedChoice}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Check Answer
        </Button>
      ) : (
        <Button
          variant={isCorrect ? "success" : "accent"}
          size="xl"
          className="w-full"
        >
          {isCorrect ? "Continue" : "Try Again"}
        </Button>
      )}
    </div>
  );
}
