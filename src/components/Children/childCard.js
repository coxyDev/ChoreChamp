import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User, Star, DollarSign, ClipboardCheck } from "lucide-react";

const avatarColors = [
  { value: "teal", class: "bg-primary", name: "Teal" },           // Logo teal
  { value: "gold", class: "bg-secondary", name: "Gold" },         // Logo gold  
  { value: "navy", class: "bg-chorechamp-navy", name: "Navy" },   // Logo navy
  { value: "orange", class: "bg-chorechamp-orange", name: "Orange" }, // Logo orange
  { value: "muted", class: "bg-muted", name: "Gray" },
  { value: "purple", class: "bg-purple-500", name: "Purple" },
  { value: "pink", class: "bg-pink-500", name: "Pink" },
  { value: "green", class: "bg-green-500", name: "Green" },
  { value: "red", class: "bg-red-500", name: "Red" },
  { value: "blue", class: "bg-blue-500", name: "Blue" }
];

export default function ChildCard({ child, choreCount = 0, completedToday = 0, delay = 0 }) {
  const progressToNextLevel = ((child.total_points || 0) % 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-card h-full">
        <CardHeader className="pb-4 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 ${avatarColors[child.avatar_color || 'blue']} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
              <span className="text-white font-bold text-lg sm:text-xl">
                {child.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg sm:text-xl text-foreground truncate">
                {child.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs border-border">
                  Age {child.age}
                </Badge>
                <Badge className="text-xs bg-secondary text-secondary-foreground">
                  Level {child.level || 1}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="text-center p-3 rounded-lg bg-accent/50">
              <div className="flex items-center justify-center gap-1 text-primary mb-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-sm sm:text-base">{child.total_points || 0}</span>
              </div>
              <span className="text-xs text-muted-foreground">Total Points</span>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-accent/50">
              <div className="flex items-center justify-center gap-1 text-secondary mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-bold text-sm sm:text-base">${(child.weekly_pocket_money || 0).toFixed(2)}</span>
              </div>
              <span className="text-xs text-muted-foreground">Weekly Allowance</span>
            </div>
          </div>
          
          {/* Progress to Next Level */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress to Level {(child.level || 1) + 1}</span>
              <span className="font-medium text-foreground">{progressToNextLevel}/100</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-2">
            <Link to={createPageUrl(`ChildProfile?childId=${child.id}`)}>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] sm:min-h-[36px]">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </Link>
            <Link to={createPageUrl(`AssignChore?childId=${child.id}`)}>
              <Button variant="outline" className="w-full border-border hover:bg-accent hover:text-accent-foreground min-h-[44px] sm:min-h-[36px]">
                <ClipboardCheck className="w-4 h-4 mr-2" />
                Assign Chore
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}