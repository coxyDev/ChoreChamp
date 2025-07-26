import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardCheck, Star, TrendingUp, Bell } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, variant, delay = 0 }) => {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20", 
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    muted: "bg-muted/10 text-muted-foreground border-muted/20"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md">
        <div className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 opacity-5 rounded-full transform translate-x-6 sm:translate-x-8 -translate-y-6 sm:-translate-y-8 ${variants[variant]}`} />
        
        <CardHeader className="pb-2 p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
                {title}
              </CardTitle>
              <div className="text-xl sm:text-2xl font-bold mt-1 text-foreground">
                {value}
              </div>
            </div>
            
            <div className={`p-2 sm:p-3 rounded-xl shadow-sm flex-shrink-0 ml-2 ${variants[variant]}`}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default function StatsGrid({ stats, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
        {Array(5).fill(0).map((_, i) => (
          <div 
            key={i} 
            className="h-24 sm:h-32 rounded-xl animate-pulse bg-muted/50" 
          />
        ))}
      </div>
    );
  }

  const statItems = [
    {
      title: "Children",
      value: stats.totalChildren,
      icon: Users,
      variant: "primary",
      delay: 0.1
    },
    {
      title: "Pending Chores",
      value: stats.pendingChores,
      icon: ClipboardCheck,
      variant: "destructive", 
      delay: 0.2
    },
    {
      title: "Completed Today",
      value: stats.completedToday,
      icon: Star,
      variant: "secondary",
      delay: 0.3
    },
    {
      title: "Total Points",
      value: stats.totalPoints,
      icon: TrendingUp,
      variant: "muted",
      delay: 0.4
    },
    {
      title: "Notifications",
      value: stats.unreadNotifications,
      icon: Bell,
      variant: "destructive",
      delay: 0.5
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
      {statItems.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
          delay={stat.delay}
        />
      ))}
    </div>
  );
}