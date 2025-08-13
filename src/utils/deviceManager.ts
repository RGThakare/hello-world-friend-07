import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { LocalNotifications } from '@capacitor/local-notifications';

export interface DeviceInfo {
  platform: 'ios' | 'android' | 'web';
  version: string;
  model: string;
}

export interface AppUsage {
  packageName: string;
  appName: string;
  timeInForeground: number;
  lastTimeUsed: number;
}

class MobileDeviceManager {
  private isBlocking = false;
  private blockedApps: string[] = [];
  private focusSessionStart: Date | null = null;

  async getDeviceInfo(): Promise<DeviceInfo> {
    try {
      const info = await Device.getInfo();
      return {
        platform: info.platform as 'ios' | 'android' | 'web',
        version: info.osVersion,
        model: info.model
      };
    } catch (error) {
      console.error('Failed to get device info:', error);
      return {
        platform: 'web',
        version: 'unknown',
        model: 'unknown'
      };
    }
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const deviceInfo = await this.getDeviceInfo();
      
      // Request notification permissions
      const notificationResult = await LocalNotifications.requestPermissions();
      
      if (deviceInfo.platform === 'android') {
        // On Android, we would need to request device admin permissions
        // This is a placeholder - actual implementation would use native plugins
        console.log('Requesting Android device admin permissions...');
        return notificationResult.display === 'granted';
      } else if (deviceInfo.platform === 'ios') {
        // On iOS, we would integrate with Screen Time API
        console.log('Requesting iOS Screen Time permissions...');
        return notificationResult.display === 'granted';
      }
      
      return true;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  async startAppBlocking(apps: string[], duration: number): Promise<boolean> {
    try {
      this.isBlocking = true;
      this.blockedApps = apps;
      this.focusSessionStart = new Date();

      // Set up monitoring
      await this.setupAppMonitoring();
      
      // Schedule end of blocking
      setTimeout(() => {
        this.stopAppBlocking();
      }, duration * 60 * 1000); // duration in minutes

      // Send notification
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Focus Mode Active',
            body: `${apps.length} apps are now blocked for ${duration} minutes`,
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) }
          }
        ]
      });

      return true;
    } catch (error) {
      console.error('Failed to start app blocking:', error);
      return false;
    }
  }

  async stopAppBlocking(): Promise<void> {
    this.isBlocking = false;
    this.blockedApps = [];
    this.focusSessionStart = null;

    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Focus Session Complete',
          body: 'Apps are now accessible again. Great job staying focused!',
          id: 2,
          schedule: { at: new Date(Date.now() + 1000) }
        }
      ]
    });
  }

  private async setupAppMonitoring(): Promise<void> {
    // Monitor app state changes
    App.addListener('appStateChange', ({ isActive }) => {
      if (isActive && this.isBlocking) {
        console.log('Focus app became active during blocking session');
      }
    });

    // In a real implementation, this would use native plugins to monitor
    // when users try to open blocked apps and show intervention screens
  }

  async getAppUsageStats(): Promise<AppUsage[]> {
    // Placeholder for app usage statistics
    // In a real app, this would integrate with native usage APIs
    return [
      {
        packageName: 'com.instagram.android',
        appName: 'Instagram',
        timeInForeground: 154 * 60 * 1000, // 2h 34m in milliseconds
        lastTimeUsed: Date.now() - 1000 * 60 * 30 // 30 minutes ago
      },
      {
        packageName: 'com.zhiliaoapp.musically',
        appName: 'TikTok',
        timeInForeground: 107 * 60 * 1000, // 1h 47m
        lastTimeUsed: Date.now() - 1000 * 60 * 15 // 15 minutes ago
      },
      {
        packageName: 'com.google.android.youtube',
        appName: 'YouTube',
        timeInForeground: 192 * 60 * 1000, // 3h 12m
        lastTimeUsed: Date.now() - 1000 * 60 * 5 // 5 minutes ago
      }
    ];
  }

  async showBlockedAppNotification(appName: string): Promise<void> {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: `${appName} is blocked`,
          body: 'Complete a mindful challenge to unlock early, or wait for your focus session to end.',
          id: Math.floor(Math.random() * 1000),
          schedule: { at: new Date(Date.now() + 100) }
        }
      ]
    });
  }

  isAppBlocked(packageName: string): boolean {
    return this.isBlocking && this.blockedApps.some(app => 
      packageName.toLowerCase().includes(app.toLowerCase())
    );
  }

  getFocusSessionDuration(): number {
    if (!this.focusSessionStart) return 0;
    return Math.floor((Date.now() - this.focusSessionStart.getTime()) / 1000);
  }
}

export const deviceManager = new MobileDeviceManager();