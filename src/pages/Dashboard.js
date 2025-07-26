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
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

import StatsGrid from "../components/dashboard/StatsGrid";
import RecentActivity from "../components/dashboard/recentActivity";
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
    totalPoints: children.reduce((sum, child) => sum + (child.total_points || 0), 0),
    unreadNotifications: notifications.length
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Family Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here's what's happening with your family today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to={createPageUrl("Children")}>
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </Link>
          <Link to={createPageUrl("ChoreTemplates")}>
            <Button variant="outline" className="border-slate-300 hover:bg-slate-50">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Browse Chores
            </Button>
          </Link>
        </div>
      </motion.div>

      <StatsGrid stats={stats} isLoading={isLoading} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ChildOverview children={children} chores={chores} />
          <RecentActivity chores={chores} children={children} />
        </div>
        
        <div className="space-y-8">
          <QuickActions />
          
          {/* Today's Achievements */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Award className="w-5 h-5" />
                Today's Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.completedToday > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">
                      {stats.completedToday} chores completed today!
                    </span>
                  </div>
                  <p className="text-sm text-green-600">
                    Your family is doing great! Keep up the excellent work.
                  </p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Calendar className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-700 font-medium">Ready for a productive day!</p>
                  <p className="text-sm text-green-600 mt-1">
                    Assign some chores to get started.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}