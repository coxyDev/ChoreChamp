import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardCheck, Star, TrendingUp, Bell } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, bgColor, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <div 
        className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full transform translate-x-8 -translate-y-8"
        style={{ backgroundColor: bgColor }}
      />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm font-medium" style={{ color: '#5A5A5A' }}>{title}</CardTitle>
            <div className="text-2xl font-bold mt-1" style={{ color: '#2F2F2F' }}>{value}</div>
          </div>
          <div 
            className="p-3 rounded-xl shadow-sm"
            style={{ backgroundColor: `${bgColor}20` }}
          >
            <Icon className="w-5 h-5" style={{ color: bgColor }} />
          </div>
        </div>
      </CardHeader>
    </Card>
  </motion.div>
);

export default function StatsGrid({ stats, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="h-32 rounded-xl animate-pulse" style={{ backgroundColor: '#BDC4A7' }} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="Children"
        value={stats.totalChildren}
        icon={Users}
        bgColor="#93827F"
        delay={0.1}
      />
      <StatCard
        title="Pending Chores"
        value={stats.pendingChores}
        icon={ClipboardCheck}
        bgColor="#DA4167"
        delay={0.2}
      />
      <StatCard
        title="Completed Today"
        value={stats.completedToday}
        icon={Star}
        bgColor="#92B4A7"
        delay={0.3}
      />
      <StatCard
        title="Total Points"
        value={stats.totalPoints}
        icon={TrendingUp}
        bgColor="#BDC4A7"
        delay={0.4}
      />
      <StatCard
        title="Notifications"
        value={stats.unreadNotifications}
        icon={Bell}
        bgColor="#DA4167"
        delay={0.5}
      />
    </div>
  );
}