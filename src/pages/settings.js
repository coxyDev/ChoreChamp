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
    <div className="bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and family preferences.
        </p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-foreground">
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
                <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#BDC4A7' }}>
                  <div>
                    <Label className="text-foreground">Full Name</Label>
                    <p className="text-muted-foreground">{currentUser?.full_name || 'Not set'}</p>
                  </div>
                  <Badge className="bg-background min-h-screen">Parent</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#BDC4A7' }}>
                  <div>
                    <Label className="text-foreground">Email Address</Label>
                    <p className="text-muted-foreground">{currentUser?.email || 'Not set'}</p>
                  </div>
                  <Mail className="w-4 h-4" style={{ color: '#93827F' }} />
                </div>
                <Button 
                  onClick={() => setIsEditingProfile(true)}
                  className="bg-background min-h-screen"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                    style={{ borderColor: '#BDC4A7' }}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    style={{ borderColor: '#BDC4A7' }}
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-background min-h-screen"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditingProfile(false);
                      setProfileData({
                        full_name: currentUser?.full_name || '',
                        email: currentUser?.email || ''
                      });
                    }}
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
            <CardTitle className="text-foreground">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Control how and when you receive notifications about your family's chores.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#BDC4A7' }}>
              <div>
                <Label className="text-foreground">Email Notifications</Label>
                <p className="text-muted-foreground">
                  Receive email updates about chore completions and achievements.
                </p>
              </div>
              <Switch 
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#BDC4A7' }}>
              <div>
                <Label className="text-foreground">Push Notifications</Label>
                <p className="text-muted-foreground">
                  Get instant notifications on your mobile device.
                </p>
              </div>
              <Switch 
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#BDC4A7' }}>
              <div>
                <Label className="text-foreground">Weekly Digest</Label>
                <p className="text-muted-foreground">
                  Receive a weekly summary of your family's chore progress.
                </p>
              </div>
              <Switch 
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#BDC4A7' }}>
              <div>
                <Label className="text-foreground">Chore Reminders</Label>
                <p className="text-muted-foreground">
                  Remind children about upcoming or overdue chores.
                </p>
              </div>
              <Switch 
                checked={settings.choreReminders}
                onCheckedChange={(checked) => handleSettingChange('choreReminders', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#BDC4A7' }}>
              <div>
                <Label className="text-foreground">Achievement Notifications</Label>
                <p className="text-muted-foreground">
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
            <CardTitle className="text-foreground">
              <SettingsIcon className="w-5 h-5" />
              Family Settings
            </CardTitle>
            <CardDescription>
              Customize how your family uses ChoreChamp.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border rounded-lg" style={{ borderColor: '#BDC4A7', backgroundColor: '#F3F5ED' }}>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-foreground">Weekly Pocket Money System</Label>
                <Badge className="bg-background min-h-screen">Active</Badge>
              </div>
              <p className="text-muted-foreground">
                Children receive fixed weekly allowances based on their age ($1 per year of age).
                Individual amounts can be customized in each child's profile.
              </p>
            </div>

            <div className="p-4 border rounded-lg" style={{ borderColor: '#BDC4A7', backgroundColor: '#F3F5ED' }}>
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-foreground">Points & Levels System</Label>
                <Badge className="bg-background min-h-screen">Active</Badge>
              </div>
              <p className="text-muted-foreground">
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
            <CardTitle className="text-foreground">
              <Shield className="w-5 h-5" />
              Account & Security
            </CardTitle>
            <CardDescription>
              Manage your account security and access.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="w-full justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}