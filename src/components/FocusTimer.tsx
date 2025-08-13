import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Timer, 
  Unlock, 
  CheckCircle, 
  DollarSign, 
  Coffee,
  Brain,
  AlertTriangle 
} from "lucide-react";
import TaskChallenge from "./TaskChallenge";

interface FocusTimerProps {
  duration: number; // duration in minutes
  onComplete: () => void;
  onEarlyExit: () => void;
}

const FocusTimer = ({ duration, onComplete, onEarlyExit }: FocusTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // duration in seconds
  const [totalTime] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(true);
  const [showUnlockOptions, setShowUnlockOptions] = useState(false);
  const [showTaskChallenge, setShowTaskChallenge] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  const handleUnlockRequest = () => {
    setIsRunning(false);
    setShowUnlockOptions(true);
  };

  const handleTaskComplete = () => {
    setShowTaskChallenge(false);
    setShowUnlockOptions(false);
    onEarlyExit();
  };

  const handlePaymentUnlock = () => {
    // This would integrate with Stripe for payment
    alert("Payment unlock feature coming soon! For now, completing the task challenge is the way to unlock early.");
    setShowUnlockOptions(false);
    setIsRunning(true);
  };

  if (showTaskChallenge) {
    return (
      <TaskChallenge 
        onComplete={handleTaskComplete}
        onCancel={() => {
          setShowTaskChallenge(false);
          setIsRunning(true);
        }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Main Timer Display */}
      <Card className="shadow-zen gradient-focus border-zen-primary/20">
        <CardContent className="p-12 text-center">
          <Badge variant="outline" className="mb-6 bg-zen-primary/10 border-zen-primary">
            <Timer className="mr-2 h-4 w-4" />
            Focus Session Active
          </Badge>
          
          <div className="text-8xl font-bold text-zen-primary mb-8 animate-zen-pulse">
            {formatTime(timeLeft)}
          </div>
          
          <Progress 
            value={progress} 
            className="w-full h-3 mb-8"
          />
          
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Stay focused! Your mind is in the zone.
            </p>
            
            {isRunning ? (
              <div className="space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsRunning(false)}
                  className="border-zen-primary hover:bg-zen-primary/10"
                >
                  Pause
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleUnlockRequest}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Unlock className="mr-2 h-4 w-4" />
                  Unlock Early
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsRunning(true)}
                className="shadow-zen"
              >
                Resume Focus
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Unlock Options Modal */}
      {showUnlockOptions && (
        <Card className="shadow-zen border-orange-200 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Break Your Focus?</h3>
              <p className="text-muted-foreground">
                Unlocking early will break your concentration. Choose wisely:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-calm transition-all group"
                onClick={() => setShowTaskChallenge(true)}
              >
                <CardContent className="p-6 text-center">
                  <Brain className="h-8 w-8 text-zen-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-2">Complete Challenge</h4>
                  <p className="text-sm text-muted-foreground">
                    Earn your unlock through a mindful task
                  </p>
                  <Badge className="mt-3 bg-zen-primary">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Recommended
                  </Badge>
                </CardContent>
              </Card>
              
              <Card 
                className="cursor-pointer hover:shadow-calm transition-all group opacity-60"
                onClick={handlePaymentUnlock}
              >
                <CardContent className="p-6 text-center">
                  <DollarSign className="h-8 w-8 text-orange-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold mb-2">Pay to Unlock</h4>
                  <p className="text-sm text-muted-foreground">
                    $2.99 instant unlock
                  </p>
                  <Badge variant="outline" className="mt-3">
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setShowUnlockOptions(false);
                  setIsRunning(true);
                }}
              >
                <Coffee className="mr-2 h-4 w-4" />
                Never mind, stay focused
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FocusTimer;