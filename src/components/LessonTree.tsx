import { LessonNode } from "./LessonNode";
import { MessageCircle, Users, Heart, Briefcase, ThumbsUp } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  icon: React.ReactNode;
  status: "locked" | "available" | "completed" | "current";
  xpReward: number;
}

interface Module {
  id: string;
  title: string;
  color: string;
  lessons: Lesson[];
}

const modules: Module[] = [
  {
    id: "greetings",
    title: "Greetings",
    color: "primary",
    lessons: [
      { id: "g1", title: "Say Hello", icon: "👋", status: "completed", xpReward: 10 },
      { id: "g2", title: "First Impressions", icon: "😊", status: "completed", xpReward: 15 },
      { id: "g3", title: "Formal Greets", icon: "🤝", status: "current", xpReward: 20 },
    ],
  },
  {
    id: "smalltalk",
    title: "Small Talk",
    color: "secondary",
    lessons: [
      { id: "s1", title: "Weather Chat", icon: "☀️", status: "available", xpReward: 15 },
      { id: "s2", title: "Hobbies", icon: "🎮", status: "locked", xpReward: 20 },
      { id: "s3", title: "Ask Questions", icon: "❓", status: "locked", xpReward: 25 },
    ],
  },
  {
    id: "conflict",
    title: "Conflict Resolution",
    color: "accent",
    lessons: [
      { id: "c1", title: "Stay Calm", icon: "🧘", status: "locked", xpReward: 25 },
      { id: "c2", title: "Listen First", icon: "👂", status: "locked", xpReward: 30 },
      { id: "c3", title: "Find Common Ground", icon: "🤝", status: "locked", xpReward: 35 },
    ],
  },
  {
    id: "networking",
    title: "Networking",
    color: "highlight",
    lessons: [
      { id: "n1", title: "Elevator Pitch", icon: "🚀", status: "locked", xpReward: 30 },
      { id: "n2", title: "Follow Up", icon: "📧", status: "locked", xpReward: 35 },
    ],
  },
  {
    id: "feedback",
    title: "Giving Feedback",
    color: "success",
    lessons: [
      { id: "f1", title: "Positive First", icon: "⭐", status: "locked", xpReward: 25 },
      { id: "f2", title: "Be Specific", icon: "🎯", status: "locked", xpReward: 30 },
    ],
  },
];

const moduleIcons: Record<string, React.ReactNode> = {
  greetings: <MessageCircle className="w-5 h-5" />,
  smalltalk: <Users className="w-5 h-5" />,
  conflict: <Heart className="w-5 h-5" />,
  networking: <Briefcase className="w-5 h-5" />,
  feedback: <ThumbsUp className="w-5 h-5" />,
};

interface LessonTreeProps {
  onLessonClick: (lessonId: string) => void;
}

export function LessonTree({ onLessonClick }: LessonTreeProps) {
  return (
    <div className="py-6 px-4">
      {modules.map((module, moduleIndex) => (
        <div key={module.id} className="mb-12">
          {/* Module Header */}
          <div className="flex items-center gap-3 mb-6 animate-slide-up" style={{ animationDelay: `${moduleIndex * 100}ms` }}>
            <div className={`w-10 h-10 rounded-xl gradient-${module.color === "primary" ? "primary" : module.color === "accent" ? "accent" : "success"} flex items-center justify-center text-primary-foreground shadow-card`}>
              {moduleIcons[module.id]}
            </div>
            <div>
              <h2 className="font-display font-bold text-foreground text-lg">{module.title}</h2>
              <p className="text-xs text-muted-foreground">
                {module.lessons.filter(l => l.status === "completed").length}/{module.lessons.length} completed
              </p>
            </div>
          </div>

          {/* Lesson Nodes - Zigzag Pattern */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 rounded-full" />

            <div className="flex flex-col items-center gap-8">
              {module.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lesson.id}
                  className={`relative ${lessonIndex % 2 === 0 ? "mr-24" : "ml-24"}`}
                >
                  <LessonNode
                    title={lesson.title}
                    icon={lesson.icon}
                    status={lesson.status}
                    xpReward={lesson.xpReward}
                    onClick={() => onLessonClick(lesson.id)}
                    delay={moduleIndex * 100 + lessonIndex * 50}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
