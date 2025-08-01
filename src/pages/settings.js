import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User } from "@/entities/all";
import { 
  Settings as SettingsIcon, 
  User as UserIcon,
  Bell,
  Shield,
  Smartphone,
  Mail,
  LogOut,
  Edit,
  Save,
  X
} from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: ''
  });
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    choreReminders: true,
    achievementNotifications: true
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
      setProfileData({
        full_name: user.full_name || '',
        email: user.email || ''
      });
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await User.updateMyUserData(profileData);
      setCurrentUser({ ...currentUser, ...profileData });
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await User.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account and family preferences.
        </p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <UserIcon className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <CardDescription>
              Manage your personal information and account details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground font-medium">Full Name</Label>
                  <p className="mt-1 text-muted-foreground">{currentUser?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <Label className="text-foreground font-medium">Email Address</Label>
                  <p className="mt-1 text-muted-foreground">{currentUser?.email || 'Not set'}</p>
                </div>
                <Button 
                  onClick={() => setIsEditingProfile(true)}
                  variant="outline"
                  className="border-border hover:bg-accent hover:text-accent-foreground"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                    className="border-border focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="border-border focus:ring-ring"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditingProfile(false)}
                    className="border-border hover:bg-accent hover:text-accent-foreground"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose when and how you want to be notified about your family's progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg border-border">
              <div>
                <Label className="font-medium text-foreground">Email Notifications</Label>
                <p className="text-sm mt-1 text-muted-foreground">
                  Receive updates about chore completions and achievements via email.
                </p>
              </div>
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg border-border">
              <div>
                <Label className="font-medium text-foreground">Push Notifications</Label>
                <p className="text-sm mt-1 text-muted-foreground">
                  Get instant notifications on your device for important updates.
                </p>
              </div>
              <Switch 
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg border-border">
              <div>
                <Label className="font-medium text-foreground">Weekly Digest</Label>
                <p className="text-sm mt-1 text-muted-foreground">
                  Receive a summary of your family's weekly progress and achievements.
                </p>
              </div>
              <Switch 
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg border-border">
              <div>
                <Label className="font-medium text-foreground">Chore Reminders</Label>
                <p className="text-sm mt-1 text-muted-foreground">
                  Send reminders to children about upcoming and overdue chores.
                </p>
              </div>
              <Switch 
                checked={settings.choreReminders}
                onCheckedChange={(checked) => handleSettingChange('choreReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg border-border">
              <div>
                <Label className="font-medium text-foreground">Achievement Notifications</Label>
                <p className="text-sm mt-1 text-muted-foreground">
                  Celebrate when children reach new levels or milestones.
                </p>
              </div>
              <Switch 
                checked={settings.achievementNotifications}
                onCheckedChange={(checked) => handleSettingChange('achievementNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Family Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <SettingsIcon className="w-5 h-5" />
              Family Settings
            </CardTitle>
            <CardDescription>
              Customize how your family uses ChoreChamp.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border rounded-lg border-border bg-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <Label className="font-medium text-foreground">Weekly Pocket Money System</Label>
                <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Children receive fixed weekly allowances based on their age ($1 per year of age).
                Individual amounts can be customized in each child's profile.
              </p>
            </div>

            <div className="p-4 border rounded-lg border-border bg-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <Label className="font-medium text-foreground">Points & Levels System</Label>
                <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Children earn points for completing chores and advance through levels.
                100 points = 1 level up.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Account Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Shield className="w-5 h-5" />
              Account Actions
            </CardTitle>
            <CardDescription>
              Manage your account security and data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <div className="flex justify-between items-center">
              <div>
                <Label className="font-medium text-foreground">Sign Out</Label>
                <p className="text-sm text-muted-foreground">Sign out of your ChoreChamp account on this device.</p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}