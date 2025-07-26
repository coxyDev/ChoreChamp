
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Star, Edit, Trash2, User, Calendar, DollarSign } from "lucide-react";

const avatarColors = {
  sage: "bg-[#BDC4A7]",
  sea: "bg-[#92B4A7]",
  mauve: "bg-[#93827F]",
  coral: "bg-[#DA4167]",
  charcoal: "bg-[#2F2F2F]",
  cream: "bg-[#F3F5D2]",
  dusty: "bg-[#D4A5A5]",
  olive: "bg-[#A8B89A]"
};

export default function ChildCard({ child, delay = 0, onEdit, onDelete }) {
  const progressToNextLevel = ((child.total_points || 0) % 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white overflow-hidden">
        <div style={{ background: 'linear-gradient(135deg, #F3F5ED, #E8EBD8)' }} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 ${avatarColors[child.avatar_color] || avatarColors.sage} rounded-full flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-xl">
                  {child.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-xl" style={{ color: '#2F2F2F' }}>{child.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs bg-white">
                    <Calendar className="w-3 h-3 mr-1" />
                    Age {child.age}
                  </Badge>
                  <Badge className="text-xs" style={{ backgroundColor: '#93827F', color: 'white' }}>
                    Level {child.level || 1}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => onEdit(child)} className="hover:bg-blue-100">
                <Edit className="w-4 h-4" style={{ color: '#5A5A5A' }} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(child.id)} className="hover:bg-red-100">
                <Trash2 className="w-4 h-4" style={{ color: '#DA4167' }} />
              </Button>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium" style={{ color: '#5A5A5A' }}>Weekly Allowance</span>
            <div className="flex items-center gap-1 font-bold" style={{ color: '#2F2F2F' }}>
              <DollarSign className="w-4 h-4" style={{ color: '#92B4A7' }} />
              <span>${(child.weekly_pocket_money || 0).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span style={{ color: '#5A5A5A' }}>Progress to Level {(child.level || 1) + 1}</span>
              <span className="font-medium" style={{ color: '#2F2F2F' }}>{progressToNextLevel}/100</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Link to={createPageUrl(`ChildProfile?childId=${child.id}`)}>
              <Button className="w-full text-white" style={{ backgroundColor: '#93827F' }}>
                <User className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </Link>
            <Link to={createPageUrl(`AssignChore?childId=${child.id}`)}>
              <Button variant="outline" className="w-full hover:bg-slate-50">
                Assign Chore
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
