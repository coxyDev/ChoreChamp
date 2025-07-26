import React, { useState, useEffect } from "react";
import { Child, Chore, Notification, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Users, 
  ClipboardCheck, 
  Star, 
  TrendingUp, 
  Plus,
  Calendar,
  Award,
  CheckCircle2,
  Zap
} from "lucide-react";
import { motion } from "framer-motion";

import StatsGrid from "../components/dashboard/StatsGrid";
import RecentActivity from "../components/dashboard/RecentActivity";
import ChildOverview from "../components/dashboard/ChildOverview";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  const [children, setChildren] = useState([]);
  const [chores, setChores] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);
      
      const [childrenData, choresData, notificationsData] = await Promise.all([
        Child.filter({ parent_email: user.email }),
        Chore.filter({ parent_email: user.email }),
        Notification.filter({ parent_email: user.email, is_read: false })
      ]);
      
      setChildren(childrenData);
      setChores(choresData);
      setNotifications(notificationsData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const stats = {
    totalChildren: children.length,
    pendingChores: chores.filter(c => c.status === 'pending').length,
    completedToday: chores.filter(c => 
      c.status === 'completed' && 
      c.completed_date && 
      new Date(c.completed_date).toDateString() === new Date().toDateString()
    ).length,
    totalPoints: children.reduce((total, child) => total + (child.total_points || 0), 0),
    unreadNotifications: notifications.length
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-screen">
        <div className="animate-pulse">
          <div className="h-6 sm:h-8 bg-muted rounded w-3/4 sm:w-1/4 mb-4 sm:mb-6"></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="h-24 sm:h-32 bg-muted rounded-xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-48 sm:h-64 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-background min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-start gap-4"
      >
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Family Dashboard</h1>
          <p className="text-base sm:text-lg mt-1 sm:mt-2 text-muted-foreground">
            Welcome back! Here's what's happening with your family today.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <Link to={createPageUrl("Children")} className="w-full sm:w-auto">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto min-h-[44px] sm:min-h-[36px]">
              <Plus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </Link>
          <Link to={createPageUrl("ChoreTemplates")} className="w-full sm:w-auto">
            <Button variant="outline" className="border-border hover:bg-accent hover:text-accent-foreground w-full sm:w-auto min-h-[44px] sm:min-h-[36px]">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Browse Chores
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <StatsGrid stats={stats} isLoading={false} />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Children Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <ChildOverview children={children} chores={chores} />
        </motion.div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <RecentActivity chores={chores} children={children} />
        </motion.div>

        {/* Quick Actions & Today's Progress */}
        <div className="space-y-4 sm:space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <QuickActions />
          </motion.div>

          {/* Today's Achievements */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card className="border-0 shadow-md">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-foreground text-base sm:text-lg">
                  <Award className="w-5 h-5 text-secondary" />
                  Today's Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {stats.completedToday > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="font-medium text-green-800 text-sm sm:text-base">
                        {stats.completedToday} chore{stats.completedToday > 1 ? 's' : ''} completed today!
                      </span>
                    </div>
                    <p className="text-sm text-green-600">
                      Your family is doing great! Keep up the excellent work.
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4 sm:py-6">
                    <Calendar className="w-8 h-8 text-muted mx-auto mb-2" />
                    <p className="text-foreground font-medium text-sm sm:text-base">Ready for a productive day!</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Assign some chores to get started.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}