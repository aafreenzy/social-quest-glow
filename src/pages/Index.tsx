import { useState, useEffect } from "react";
import { SimpleHeader } from "@/components/SimpleHeader";
import { SkillWorld } from "@/components/SkillWorld";
import { ScenarioCard } from "@/components/ScenarioCard";
import { BottomNav } from "@/components/BottomNav";
import { GrowthCard } from "@/components/GrowthCard";
import { MicroNudge } from "@/components/MicroNudge";
import { Onboarding } from "@/components/Onboarding";
import { Confetti } from "@/components/Confetti";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type View = "onboarding" | "home" | "lesson" | "profile";

const skills = [
  { id: "greetings", title: "Greetings & Hellos", emoji: "👋", lessonsTotal: 3, lessonsCompleted: 2, isUnlocked: true, isCurrent: true },
  { id: "smalltalk", title: "Small Talk", emoji: "💬", lessonsTotal: 4, lessonsCompleted: 0, isUnlocked: true, isCurrent: false },
  { id: "conflict", title: "Handling Disagreements", emoji: "🤝", lessonsTotal: 3, lessonsCompleted: 0, isUnlocked: false, isCurrent: false },
  { id: "networking", title: "Meeting New People", emoji: "🌟", lessonsTotal: 3, lessonsCompleted: 0, isUnlocked: false, isCurrent: false },
  { id: "feedback", title: "Giving & Receiving Feedback", emoji: "💭", lessonsTotal: 3, lessonsCompleted: 0, isUnlocked: false, isCurrent: false },
];

const sampleScenario = {
  scenario: "You bump into a coworker in the hallway. They say 'Hey! How's it going?'",
  context: "Casual Greeting",
  emoji: "👋",
  choices: [
    {
      id: "a",
      text: "Fine.",
      effectiveness: "tricky" as const,
      feedback: "Short responses can come across as uninterested. Try adding a bit more to keep the door open for connection.",
    },
    {
      id: "b",
      text: "Hey! Pretty good, thanks. How about you?",
      effectiveness: "good" as const,
      feedback: "This keeps things warm and shows you're open to chatting. The question back invites them to share too.",
    },
    {
      id: "c",
      text: "*Wave and keep walking*",
      effectiveness: "okay" as const,
      feedback: "Totally valid if you're in a rush! A quick wave acknowledges them. You could add a smile or quick 'Hey!' next time.",
    },
    {
      id: "d",
      text: "Not great, honestly.",
      effectiveness: "okay" as const,
      feedback: "Being honest is real. Depending on your relationship, this can deepen connection — or feel heavy for a hallway chat.",
    },
  ],
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<"home" | "lessons" | "achievements" | "profile">("home");
  const [view, setView] = useState<View>("onboarding");
  const [showConfetti, setShowConfetti] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Check if user has seen onboarding
  useEffect(() => {
    const seen = localStorage.getItem("onboarding_complete");
    if (seen) {
      setHasCompletedOnboarding(true);
      setView("home");
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboarding_complete", "true");
    setHasCompletedOnboarding(true);
    setView("home");
  };

  const handleLessonComplete = (wasEffective: boolean) => {
    if (wasEffective) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
  };

  const handleTabChange = (tab: "home" | "lessons" | "achievements" | "profile") => {
    setActiveTab(tab);
    if (tab === "home") setView("home");
    else if (tab === "lessons") setView("home");
    else if (tab === "profile") setView("profile");
    else setView("home");
  };

  if (view === "onboarding" && !hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen pb-24">
      <Confetti isActive={showConfetti} />
      
      <SimpleHeader name="Alex" />

      {view === "home" && (
        <main className="px-5 py-6 max-w-lg mx-auto">
          {/* Welcome - minimal */}
          <div className="mb-8 animate-slide-up">
            <h1 className="font-display font-black text-2xl text-foreground mb-1">
              Ready to practice? 
            </h1>
            <p className="text-muted-foreground font-body">
              No pressure. Just pick a skill and try it out.
            </p>
          </div>

          {/* Micro Nudge - optional, gentle */}
          <div className="mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <MicroNudge 
              title="Quick idea"
              description="Try saying 'hey' to someone today. That's it!"
            />
          </div>

          {/* Skills / Learning Path - THE HERO */}
          <div className="mb-8 animate-slide-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-foreground">Skills to explore</h2>
            </div>
            <SkillWorld 
              skills={skills} 
              onSkillClick={() => setView("lesson")} 
            />
          </div>

          {/* Continue CTA */}
          <Button
            variant="default"
            size="lg"
            className="w-full animate-slide-up"
            style={{ animationDelay: "200ms" }}
            onClick={() => setView("lesson")}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Jump into practice
          </Button>
        </main>
      )}

      {view === "lesson" && (
        <main className="py-4">
          <div className="px-4 mb-2">
            <Button variant="ghost" size="sm" onClick={() => setView("home")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <ScenarioCard {...sampleScenario} onComplete={handleLessonComplete} />
        </main>
      )}

      {view === "profile" && (
        <main className="px-5 py-6 max-w-lg mx-auto">
          <div className="flex flex-col items-center mb-8 animate-slide-up">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-4xl shadow-card mb-4">
              😊
            </div>
            <h1 className="font-display font-bold text-xl text-foreground">Alex</h1>
            <p className="text-muted-foreground text-sm">Exploring social skills</p>
          </div>

          {/* Growth Card - trends not scores */}
          <div className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <GrowthCard 
              practiceStreak={7}
              totalPracticed={24}
              skillsExplored={2}
            />
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            You're building something. Keep going at your own pace.
          </p>
        </main>
      )}

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}