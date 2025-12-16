import { useState } from "react";
import { ProgressHeader } from "@/components/ProgressHeader";
import { LessonTree } from "@/components/LessonTree";
import { ScenarioCard } from "@/components/ScenarioCard";
import { BottomNav } from "@/components/BottomNav";
import { BadgeCard } from "@/components/BadgeCard";
import { DailyChallenge } from "@/components/DailyChallenge";
import { ProgressBar } from "@/components/ProgressBar";
import { Confetti } from "@/components/Confetti";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type View = "home" | "lesson" | "achievements" | "profile";

const sampleScenario = {
  scenario: "You bump into your coworker in the hallway. They say 'Hey! How's it going?' What's your best response?",
  context: "Workplace Greetings",
  emoji: "👋",
  choices: [
    {
      id: "a",
      text: "Fine.",
      isCorrect: false,
      feedback: "A bit short! Adding more shows you're open to conversation.",
    },
    {
      id: "b",
      text: "Hey! Pretty good, thanks! How about you?",
      isCorrect: true,
      feedback: "Perfect! You acknowledged them, answered positively, and showed interest by asking back.",
    },
    {
      id: "c",
      text: "*Keep walking and wave*",
      isCorrect: false,
      feedback: "A wave is friendly, but stopping briefly shows more engagement.",
    },
    {
      id: "d",
      text: "I don't want to talk right now.",
      isCorrect: false,
      feedback: "While honesty is good, this could seem dismissive. A brief friendly response is better.",
    },
  ],
};

const badges = [
  { name: "First Steps", description: "Complete your first lesson", icon: "🎯", isUnlocked: true, rarity: "common" as const },
  { name: "Streak Master", description: "7 day streak", icon: "🔥", isUnlocked: true, rarity: "rare" as const },
  { name: "Social Butterfly", description: "Complete all Greetings", icon: "🦋", isUnlocked: false, rarity: "epic" as const },
  { name: "Legendary Networker", description: "Master all modules", icon: "👑", isUnlocked: false, rarity: "legendary" as const },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<"home" | "lessons" | "achievements" | "profile">("home");
  const [view, setView] = useState<View>("home");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLessonComplete = (correct: boolean) => {
    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
  };

  const handleTabChange = (tab: "home" | "lessons" | "achievements" | "profile") => {
    setActiveTab(tab);
    if (tab === "home") setView("home");
    else if (tab === "lessons") setView("home");
    else if (tab === "achievements") setView("achievements");
    else if (tab === "profile") setView("profile");
  };

  return (
    <div className="min-h-screen pb-24">
      <Confetti isActive={showConfetti} />
      
      <ProgressHeader xp={1250} streak={7} hearts={5} level={12} />

      {view === "home" && activeTab === "home" && (
        <main className="px-4 py-6 max-w-lg mx-auto">
          {/* Welcome Section */}
          <div className="mb-6 animate-slide-up">
            <h1 className="font-display font-black text-2xl text-foreground mb-1">
              Welcome back, Alex! 👋
            </h1>
            <p className="text-muted-foreground font-body">
              Ready to level up your social skills?
            </p>
          </div>

          {/* Today's Progress */}
          <div className="bg-card rounded-3xl p-5 shadow-card mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-foreground">Today's Progress</h2>
              <span className="text-xs font-bold text-secondary">2/5 lessons</span>
            </div>
            <ProgressBar value={2} max={5} variant="primary" size="lg" />
            <div className="flex items-center gap-2 mt-3">
              <Sparkles className="w-4 h-4 text-warning" />
              <span className="text-sm text-muted-foreground">+50 XP earned today</span>
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="mb-6" style={{ animationDelay: "200ms" }}>
            <DailyChallenge
              title="Quick Connector"
              description="Complete 3 small talk scenarios"
              progress={1}
              goal={3}
              xpReward={100}
              timeLeft="4h 32m"
              onStart={() => setView("lesson")}
            />
          </div>

          {/* Continue Learning CTA */}
          <Button
            variant="default"
            size="xl"
            className="w-full mb-6 animate-slide-up"
            style={{ animationDelay: "300ms" }}
            onClick={() => setView("lesson")}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Continue Learning
          </Button>

          {/* Lesson Tree Preview */}
          <div className="animate-slide-up" style={{ animationDelay: "400ms" }}>
            <h2 className="font-display font-bold text-foreground mb-4">Your Journey</h2>
            <LessonTree onLessonClick={() => setView("lesson")} />
          </div>
        </main>
      )}

      {view === "lesson" && (
        <main className="py-4">
          <div className="px-4 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setView("home")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          <ScenarioCard {...sampleScenario} onComplete={handleLessonComplete} />
        </main>
      )}

      {view === "achievements" && (
        <main className="px-4 py-6 max-w-lg mx-auto">
          <h1 className="font-display font-black text-2xl text-foreground mb-6 animate-slide-up">
            Your Badges 🏆
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, i) => (
              <div key={badge.name} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <BadgeCard {...badge} />
              </div>
            ))}
          </div>
        </main>
      )}

      {view === "profile" && (
        <main className="px-4 py-6 max-w-lg mx-auto">
          <div className="flex flex-col items-center animate-slide-up">
            <div className="w-24 h-24 rounded-full gradient-hero flex items-center justify-center text-5xl shadow-glow mb-4">
              😎
            </div>
            <h1 className="font-display font-black text-2xl text-foreground">Alex</h1>
            <p className="text-muted-foreground mb-6">Level 12 Social Star</p>

            <div className="w-full bg-card rounded-3xl p-5 shadow-card">
              <h2 className="font-display font-bold text-foreground mb-4">Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total XP</span>
                  <span className="font-bold text-secondary">1,250</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Streak</span>
                  <span className="font-bold text-highlight">7 days 🔥</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Lessons Completed</span>
                  <span className="font-bold text-success">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Badges Earned</span>
                  <span className="font-bold text-accent">2/15</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
