import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Heart, 
  Target, 
  CheckCircle2, 
  ArrowLeft,
  Lightbulb,
  Smile 
} from "lucide-react";

interface TaskChallengeProps {
  onComplete: () => void;
  onCancel: () => void;
}

const TaskChallenge = ({ onComplete, onCancel }: TaskChallengeProps) => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [reflectionText, setReflectionText] = useState("");
  const [breathingCount, setBreathingCount] = useState(0);
  const [gratitudeItems, setGratitudeItems] = useState<string[]>(["", "", ""]);

  const challenges = [
    {
      id: "breathing",
      title: "Mindful Breathing",
      description: "Take 10 deep, conscious breaths",
      icon: Heart,
      color: "text-red-500",
      duration: "2 minutes"
    },
    {
      id: "gratitude",
      title: "Gratitude Practice",
      description: "List 3 things you're grateful for",
      icon: Smile,
      color: "text-yellow-500",
      duration: "3 minutes"
    },
    {
      id: "intention",
      title: "Set Intention",
      description: "Write why this focus time matters",
      icon: Target,
      color: "text-zen-primary",
      duration: "2 minutes"
    },
    {
      id: "reflection",
      title: "Quick Reflection",
      description: "Reflect on your current state of mind",
      icon: Lightbulb,
      color: "text-zen-secondary",
      duration: "3 minutes"
    }
  ];

  const handleBreathingStep = () => {
    const newCount = breathingCount + 1;
    setBreathingCount(newCount);
    if (newCount >= 10) {
      setChallengeCompleted(true);
    }
  };

  const handleGratitudeChange = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
    
    if (newItems.every(item => item.trim().length > 0)) {
      setChallengeCompleted(true);
    }
  };

  const handleReflectionChange = (value: string) => {
    setReflectionText(value);
    if (value.trim().length >= 50) {
      setChallengeCompleted(true);
    }
  };

  const renderChallengeContent = () => {
    const challenge = challenges.find(c => c.id === selectedChallenge);
    if (!challenge) return null;

    switch (selectedChallenge) {
      case "breathing":
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl font-bold text-zen-primary">
              {breathingCount}/10
            </div>
            <p className="text-lg text-muted-foreground">
              Click the button with each breath cycle
            </p>
            <Button 
              size="lg"
              onClick={handleBreathingStep}
              className="animate-zen-pulse shadow-zen"
              disabled={breathingCount >= 10}
            >
              <Heart className="mr-2 h-5 w-5" />
              {breathingCount >= 10 ? "Complete!" : "Breathe"}
            </Button>
          </div>
        );

      case "gratitude":
        return (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground mb-6">
              What are you grateful for today?
            </p>
            {gratitudeItems.map((item, index) => (
              <div key={index} className="space-y-2">
                <label className="text-sm font-medium">
                  Gratitude {index + 1}
                </label>
                <Input
                  value={item}
                  onChange={(e) => handleGratitudeChange(index, e.target.value)}
                  placeholder="I'm grateful for..."
                  className="border-zen-primary/20 focus:border-zen-primary"
                />
              </div>
            ))}
          </div>
        );

      case "intention":
      case "reflection":
        return (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              {selectedChallenge === "intention" 
                ? "Why is this focus time important to you right now?"
                : "How are you feeling in this moment? What's on your mind?"
              }
            </p>
            <Textarea
              value={reflectionText}
              onChange={(e) => handleReflectionChange(e.target.value)}
              placeholder={selectedChallenge === "intention" 
                ? "This focus time will help me..."
                : "I'm feeling..."
              }
              className="min-h-32 border-zen-primary/20 focus:border-zen-primary"
            />
            <p className="text-xs text-muted-foreground text-center">
              {reflectionText.length}/50 characters minimum
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  if (!selectedChallenge) {
    return (
      <Card className="max-w-2xl mx-auto shadow-zen">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Brain className="h-16 w-16 text-zen-primary mx-auto mb-4 animate-zen-float" />
            <h2 className="text-3xl font-bold mb-2">Mindful Challenge</h2>
            <p className="text-muted-foreground">
              Complete a mindful activity to earn your early unlock
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
                <Card 
                  key={challenge.id}
                  className="cursor-pointer hover:shadow-calm transition-all group"
                  onClick={() => setSelectedChallenge(challenge.id)}
                >
                  <CardContent className="p-6">
                    <Icon className={`h-8 w-8 ${challenge.color} mb-3 group-hover:scale-110 transition-transform`} />
                    <h3 className="font-semibold mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {challenge.duration}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Button variant="ghost" onClick={onCancel}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Focus
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const challenge = challenges.find(c => c.id === selectedChallenge)!;
  const Icon = challenge.icon;

  return (
    <Card className="max-w-2xl mx-auto shadow-zen">
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Icon className={`h-12 w-12 ${challenge.color} mx-auto mb-4`} />
          <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
          <p className="text-muted-foreground">{challenge.description}</p>
        </div>

        {renderChallengeContent()}

        <div className="mt-8 flex gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => setSelectedChallenge(null)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Choose Different
          </Button>
          
          {challengeCompleted && (
            <Button 
              onClick={onComplete}
              className="shadow-zen animate-zen-pulse"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Unlock & Exit Focus
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskChallenge;