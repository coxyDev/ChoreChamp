import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User, Star, Plus, Calendar } from "lucide-react";

const avatarColors = {
  blue: "bg-blue-500",
  green: "bg-primary/100",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  teal: "bg-teal-500",
};

const ChildCard = ({ child, choreCount, completedToday, delay = 0 }) => {
  const progressToNextLevel = ((child.total_points || 0) % 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${avatarColors[child.avatar_color || 'blue']} rounded-full flex items-center justify-center shadow-md`}>
              <span className="text-white font-bold text-lg">
                {child.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground">{child.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  Age {child.age}
                </Badge>
                <Badge className="bg-primary/20 text-primary text-xs">
                  Level {child.level || 1}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-secondary">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{child.total_points || 0}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Level {(child.level || 1) + 1}</span>
              <span className="text-foreground font-medium">{progressToNextLevel}/100</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-muted rounded-lg p-3">
              <div className="text-2xl font-bold text-foreground">{choreCount}</div>
              <div className="text-xs text-muted-foreground">Active Chores</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-3">
              <div className="text-2xl font-bold text-primary">{completedToday}</div>
              <div className="text-xs text-primary">Completed Today</div>
            </div>
          </div>
          
          <Link to={createPageUrl(`ChildProfile?childId=${child.id}`)}>
            <Button variant="outline" className="w-full hover:bg-muted">
              View Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function ChildOverview({ children, chores }) {
  const getChildStats = (childId) => {
    const childChores = chores.filter(c => c.assigned_to === childId);
    const completedToday = childChores.filter(c => 
      c.status === 'completed' && 
      c.completed_date && 
      new Date(c.completed_date).toDateString() === new Date().toDateString()
    ).length;
    
    return {
      choreCount: childChores.filter(c => c.status === 'pending').length,
      completedToday
    };
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-foreground">My Children</CardTitle>
          <Link to={createPageUrl("Children")}>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Child
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {children.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground/90 mb-2">No children added yet</h3>
            <p className="text-muted-foreground mb-6">Start by adding your first child to begin tracking chores!</p>
            <Link to={createPageUrl("Children")}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Child
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((child, index) => {
              const stats = getChildStats(child.id);
              return (
                <ChildCard
                  key={child.id}
                  child={child}
                  choreCount={stats.choreCount}
                  completedToday={stats.completedToday}
                  delay={index * 0.1}
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}