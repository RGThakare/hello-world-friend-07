import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Clock, 
  Target, 
  TrendingUp,
  Award,
  Calendar
} from "lucide-react";

interface StatsOverviewProps {
  streakDays: number;
  totalMinutes: number;
  currentSession: number;
}

const StatsOverview = ({ streakDays, totalMinutes, currentSession }: StatsOverviewProps) => {
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const stats = [
    {
      icon: Flame,
      label: "Focus Streak",
      value: `${streakDays}`,
      unit: "days",
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      description: "Consecutive focus days"
    },
    {
      icon: Clock,
      label: "Total Focus Time",
      value: `${totalHours}h`,
      unit: `${totalMinutes % 60}m`,
      color: "text-zen-primary",
      bgColor: "bg-zen-primary/5",
      description: "All-time focused minutes"
    },
    {
      icon: Target,
      label: "Sessions Today",
      value: `${currentSession}`,
      unit: "completed",
      color: "text-zen-secondary",
      bgColor: "bg-zen-secondary/5",
      description: "Focus sessions finished"
    },
    {
      icon: TrendingUp,
      label: "Progress Level",
      value: "Focused",
      unit: "zen master",
      color: "text-zen-accent",
      bgColor: "bg-zen-accent/5",
      description: "Your focus ranking"
    }
  ];

  const achievements = [
    { name: "First Focus", earned: true, icon: Target },
    { name: "Week Warrior", earned: streakDays >= 7, icon: Calendar },
    { name: "Focus Master", earned: totalHours >= 100, icon: Award },
    { name: "Zen Champion", earned: streakDays >= 30, icon: Flame }
  ];

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="shadow-calm hover:shadow-zen transition-all duration-300">
              <CardContent className="p-6">
                <div className={`inline-flex p-3 rounded-full ${stat.bgColor} mb-4`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.unit}</span>
                  </div>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Achievements Section */}
      <Card className="shadow-calm">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-zen-primary" />
            Achievements
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div 
                  key={achievement.name}
                  className={`text-center p-4 rounded-lg transition-all ${
                    achievement.earned 
                      ? 'bg-zen-primary/10 border-2 border-zen-primary/20' 
                      : 'bg-muted/30 border border-border opacity-50'
                  }`}
                >
                  <Icon className={`h-8 w-8 mx-auto mb-2 ${
                    achievement.earned ? 'text-zen-primary' : 'text-muted-foreground'
                  }`} />
                  <p className={`text-sm font-medium ${
                    achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {achievement.name}
                  </p>
                  {achievement.earned && (
                    <Badge variant="secondary" className="mt-2 text-xs bg-zen-primary text-zen-primary-foreground">
                      Earned
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card className="gradient-focus border-zen-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zen-primary/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-zen-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Today's Focus Insight</h3>
              <p className="text-sm text-muted-foreground">
                {streakDays >= 7 
                  ? `Amazing! You're on a ${streakDays}-day streak. Your consistency is building real focus habits.`
                  : totalHours >= 50 
                  ? `You've focused for ${totalHours} hours total. Your dedication is paying off!`
                  : "Great start on your focus journey! Each session builds stronger concentration."
                }
              </p>
            </div>
            <Badge variant="secondary" className="bg-zen-primary/10">
              <Flame className="mr-1 h-3 w-3" />
              Keep going
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;