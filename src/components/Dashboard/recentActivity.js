import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { CheckCircle2, Clock, Calendar, Star } from "lucide-react";
import { format, isToday, isYesterday, isValid } from "date-fns";

const ActivityItem = ({ activity, children }) => {
  const child = children.find(c => c.id === activity.assigned_to);
  
  const getTimeDisplay = (dateString) => {
    if (!dateString) return "Recently";
    
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (!isValid(date)) return "Recently";
    
    try {
      if (isToday(date)) return "Today";
      if (isYesterday(date)) return "Yesterday";
      return format(date, "MMM d");
    } catch (error) {
      console.warn("Date formatting error:", error, "for date:", dateString);
      return "Recently";
    }
  };

  const statusColors = {
  completed: "bg-primary/20 text-primary",
  pending: "bg-secondary/20 text-secondary-foreground",
  verified: "bg-accent/20 text-accent-foreground"
};

  const statusIcons = {
    completed: CheckCircle2,
    pending: Clock,
    verified: Star
  };

  const StatusIcon = statusIcons[activity.status] || Clock;

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
        <StatusIcon className={`w-5 h-5 ${
          activity.status === 'completed' ? 'text-primary' : 
          activity.status === 'verified' ? 'text-accent' : 'text-secondary'
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{activity.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-muted-foreground">{child?.name || 'Unknown Child'}</span>
          <Badge variant="outline" className={`text-xs ${statusColors[activity.status] || statusColors.pending}`}>
            {activity.status || 'pending'}
          </Badge>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center gap-1 text-secondary mb-1">
          <Star className="w-3 h-3 fill-current" />
          <span className="text-sm font-medium">{activity.points || 0}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {activity.completed_date ? getTimeDisplay(activity.completed_date) : getTimeDisplay(activity.created_date)}
        </p>
      </div>
    </div>
  );
};

export default function RecentActivity({ chores, children }) {
  const recentChores = chores
    .filter(chore => chore.completed_date || chore.created_date) // Only include chores with valid dates
    .sort((a, b) => {
      const dateA = new Date(a.completed_date || a.created_date);
      const dateB = new Date(b.completed_date || b.created_date);
      
      // Handle invalid dates
      if (!isValid(dateA) && !isValid(dateB)) return 0;
      if (!isValid(dateA)) return 1;
      if (!isValid(dateB)) return -1;
      
      return dateB - dateA;
    })
    .slice(0, 8);

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {recentChores.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-muted-foreground-300 mx-auto mb-3" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground-400 mt-1">Chore activities will appear here once you start assigning tasks.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentChores.map((chore) => (
              <ActivityItem
                key={chore.id}
                activity={chore}
                children={children}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}