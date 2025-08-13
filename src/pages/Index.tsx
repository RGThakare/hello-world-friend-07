import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Timer, Shield, Target, TrendingUp, Play, Pause, Settings, Smartphone } from "lucide-react";
import zenHero from "@/assets/zen-hero.jpg";
import FocusTimer from "@/components/FocusTimer";
import StatsOverview from "@/components/StatsOverview";
import TaskChallenge from "@/components/TaskChallenge";

const Index = () => {
  const [isInFocus, setIsInFocus] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(25); // in minutes
  const [focusStreakDays, setFocusStreakDays] = useState(7);
  const [totalFocusTime, setTotalFocusTime] = useState(1847); // in minutes
  const [currentSession, setCurrentSession] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${zenHero})` }}
        />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4 animate-zen-float">
              <Smartphone className="mr-2 h-4 w-4" />
              Native Mobile App
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-zen bg-clip-text text-transparent">
              Focus Zen
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Reclaim your focus with mindful digital detox sessions. 
              Block distractions, complete zen challenges, or unlock early with intention.
            </p>
            
            {!isInFocus ? (
              <Button 
                size="lg" 
                className="shadow-zen hover:shadow-calm transition-all duration-300 animate-zen-pulse"
                onClick={() => setIsInFocus(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Start Focus Session
              </Button>
            ) : (
              <div className="space-y-4">
                <Badge variant="outline" className="bg-zen-primary/10 border-zen-primary animate-focus-breathe">
                  <Timer className="mr-2 h-4 w-4" />
                  Focus Mode Active
                </Badge>
                <Button 
                  variant="outline" 
                  onClick={() => setIsInFocus(false)}
                  className="ml-4"
                >
                  <Pause className="mr-2 h-4 w-4" />
                  End Session
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-12">
        {isInFocus ? (
          <FocusTimer 
            duration={selectedDuration}
            onComplete={() => setIsInFocus(false)}
            onEarlyExit={() => setIsInFocus(false)}
          />
        ) : (
          <>
            {/* Quick Stats */}
            <StatsOverview 
              streakDays={focusStreakDays}
              totalMinutes={totalFocusTime}
              currentSession={currentSession}
            />

            {/* Focus Duration Options */}
            <Card className="shadow-calm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                  Choose Your Focus Duration
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { duration: 25, label: "Pomodoro", description: "Quick focus burst" },
                    { duration: 45, label: "Deep Work", description: "Sustained concentration" },
                    { duration: 90, label: "Flow State", description: "Maximum productivity" }
                  ].map((option) => (
                    <Card 
                      key={option.duration}
                      className="cursor-pointer hover:shadow-zen transition-all duration-300 group"
                      onClick={() => {
                        setSelectedDuration(option.duration);
                        setIsInFocus(true);
                      }}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-zen-primary mb-2 group-hover:scale-110 transition-transform">
                          {option.duration}m
                        </div>
                        <h3 className="font-semibold mb-1">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievement */}
            <Card className="gradient-focus border-zen-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-zen-primary/10 rounded-full">
                    <Target className="h-6 w-6 text-zen-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Focus Streak Achievement!</h3>
                    <p className="text-sm text-muted-foreground">
                      You've maintained focus for {focusStreakDays} consecutive days
                    </p>
                    <Progress value={(focusStreakDays / 30) * 100} className="mt-2" />
                  </div>
                  <Badge variant="secondary">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +{focusStreakDays} days
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};

export default Index;