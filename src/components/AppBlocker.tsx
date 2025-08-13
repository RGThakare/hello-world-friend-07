import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Smartphone, 
  Shield, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  Instagram,
  MessageCircle,
  Youtube,
  Twitter,
  Facebook,
  Settings,
  Lock,
  Unlock
} from "lucide-react";

interface AppBlockerProps {
  isActive: boolean;
  timeRemaining: number; // in seconds
  onToggle: (enabled: boolean) => void;
}

const AppBlocker = ({ isActive, timeRemaining, onToggle }: AppBlockerProps) => {
  const [blockedApps, setBlockedApps] = useState<string[]>([
    "Instagram",
    "TikTok", 
    "Facebook",
    "Twitter",
    "YouTube"
  ]);
  const [devicePermissions, setDevicePermissions] = useState({
    deviceAdmin: false,
    accessibility: false,
    notifications: true
  });

  // Simulated social media apps with their status
  const socialApps = [
    { name: "Instagram", icon: Instagram, blocked: isActive, timeWasted: "2h 34m today" },
    { name: "TikTok", icon: MessageCircle, blocked: isActive, timeWasted: "1h 47m today" },
    { name: "YouTube", icon: Youtube, blocked: isActive, timeWasted: "3h 12m today" },
    { name: "Twitter", icon: Twitter, blocked: isActive, timeWasted: "45m today" },
    { name: "Facebook", icon: Facebook, blocked: isActive, timeWasted: "1h 23m today" }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const requestPermissions = async () => {
    // In a real app, this would request actual device admin permissions
    try {
      // Simulate permission request
      console.log("Requesting device admin permissions...");
      
      // For demo purposes, we'll simulate getting permissions
      setTimeout(() => {
        setDevicePermissions(prev => ({
          ...prev,
          deviceAdmin: true,
          accessibility: true
        }));
      }, 1000);
      
    } catch (error) {
      console.error("Permission request failed:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* App Blocker Status */}
      <Card className={`shadow-zen transition-all duration-300 ${
        isActive ? 'border-red-500 bg-red-50 dark:bg-red-950/20' : 'border-zen-primary bg-zen-primary/5'
      }`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {isActive ? (
              <Lock className="h-6 w-6 text-red-500" />
            ) : (
              <Unlock className="h-6 w-6 text-zen-primary" />
            )}
            App Blocking {isActive ? 'Active' : 'Inactive'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {isActive ? 'Apps are currently blocked' : 'Apps are accessible'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isActive 
                    ? `Time remaining: ${formatTime(timeRemaining)}`
                    : 'Start a focus session to activate blocking'
                  }
                </p>
              </div>
              <Switch
                checked={isActive}
                onCheckedChange={onToggle}
                className="data-[state=checked]:bg-red-500"
              />
            </div>

            {isActive && (
              <div className="space-y-3">
                <Progress 
                  value={((3600 - timeRemaining) / 3600) * 100} 
                  className="h-2"
                />
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Attempting to open blocked apps will trigger mindful challenges
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Device Permissions */}
      <Card className="shadow-calm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-zen-primary" />
            Device Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Device Administrator</p>
                <p className="text-sm text-muted-foreground">Required to block apps</p>
              </div>
              <Badge variant={devicePermissions.deviceAdmin ? "default" : "destructive"}>
                {devicePermissions.deviceAdmin ? (
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                ) : (
                  <AlertTriangle className="mr-1 h-3 w-3" />
                )}
                {devicePermissions.deviceAdmin ? 'Granted' : 'Required'}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Accessibility Service</p>
                <p className="text-sm text-muted-foreground">Monitor app usage</p>
              </div>
              <Badge variant={devicePermissions.accessibility ? "default" : "destructive"}>
                {devicePermissions.accessibility ? (
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                ) : (
                  <AlertTriangle className="mr-1 h-3 w-3" />
                )}
                {devicePermissions.accessibility ? 'Granted' : 'Required'}
              </Badge>
            </div>

            {(!devicePermissions.deviceAdmin || !devicePermissions.accessibility) && (
              <Button 
                onClick={requestPermissions}
                className="w-full shadow-zen"
              >
                <Shield className="mr-2 h-4 w-4" />
                Grant Permissions
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Blocked Apps List */}
      <Card className="shadow-calm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Smartphone className="h-6 w-6 text-zen-primary" />
            Social Media Apps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {socialApps.map((app) => {
              const IconComponent = app.icon;
              return (
                <div 
                  key={app.name}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                    app.blocked 
                      ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20' 
                      : 'border-border bg-background'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`h-8 w-8 ${
                      app.blocked ? 'text-red-500 opacity-50' : 'text-zen-primary'
                    }`} />
                    <div>
                      <p className={`font-medium ${app.blocked ? 'text-red-600 dark:text-red-400' : ''}`}>
                        {app.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {app.timeWasted}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {app.blocked ? (
                      <Badge variant="destructive" className="text-xs">
                        <Lock className="mr-1 h-3 w-3" />
                        Blocked
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Available
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card className="gradient-focus border-zen-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-zen-primary" />
            Today's Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-zen-primary">4h 23m</p>
              <p className="text-sm text-muted-foreground">Time Saved</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-zen-primary">47</p>
              <p className="text-sm text-muted-foreground">Apps Blocked</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppBlocker;