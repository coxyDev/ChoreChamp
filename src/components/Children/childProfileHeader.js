
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, DollarSign, Award, Calendar, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Child } from '@/entities/all'; // Assuming this path is correct for your Child entity

const avatarColors = {
  blue: "bg-blue-500", green: "bg-green-500", purple: "bg-purple-500",
  orange: "bg-orange-500", pink: "bg-pink-500", red: "bg-red-500",
  yellow: "bg-yellow-500", teal: "bg-teal-500",
};

export default function ChildProfileHeader({ child }) {
  const [currentChild, setCurrentChild] = useState(child);
  const [isPaying, setIsPaying] = useState(false);
  
  const progressToNextLevel = ((currentChild.total_points || 0) % 100);

  const handlePayday = async () => {
    setIsPaying(true);
    try {
      // Calculate the new total money
      const newTotalMoney = (currentChild.total_money || 0) + (currentChild.weekly_pocket_money || 0);

      // Call the Child entity's update method
      const updatedChild = await Child.update(currentChild.id, {
        total_money: newTotalMoney
      });
      setCurrentChild(updatedChild); // Update the local state with the new child data
    } catch (error) {
      console.error("Error processing payday:", error);
      // Optionally, show an error toast/message to the user
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
      <Card className="border-border shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-muted via-card to-accent/20 p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className={`w-24 h-24 md:w-32 md:h-32 ${avatarColors[currentChild.avatar_color]} rounded-full flex items-center justify-center shadow-xl flex-shrink-0`}>
              <span className="text-white font-bold text-5xl">
                {currentChild.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-grow w-full text-center md:text-left">
              <h1 className="text-4xl font-bold text-foreground">{currentChild.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                <Badge variant="outline" className="text-sm bg-card"><Calendar className="w-3 h-3 mr-1" /> Age {currentChild.age}</Badge>
                <Badge className="bg-purple-100 text-purple-700 text-sm"><Award className="w-3 h-3 mr-1" /> Level {currentChild.level}</Badge>
              </div>
              <div className="mt-4">
                 <Progress value={progressToNextLevel} className="h-3" />
                 <p className="text-xs text-muted-foreground mt-1 text-right">
                   {100 - progressToNextLevel} points to next level
                 </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-card p-4 rounded-xl shadow-md border-border w-full md:w-auto">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-100 rounded-lg"><Star className="w-5 h-5 text-yellow-500" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Points</p>
                  <p className="text-xl font-bold text-foreground">{currentChild.total_points}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-lg"><DollarSign className="w-5 h-5 text-green-600" /></div>
                <div>
                  <p className="text-xs text-muted-foreground">Money in Bank</p>
                  <p className="text-xl font-bold text-foreground">${(currentChild.total_money || 0).toFixed(2)}</p>
                </div>
              </div>
              {/* Payday Button */}
              <Button 
                onClick={handlePayday} 
                disabled={isPaying || (currentChild.weekly_pocket_money || 0) === 0} 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-2"
              >
                  <Check className="w-4 h-4 mr-2" />
                  {isPaying ? "Processing..." : `Pay $${(currentChild.weekly_pocket_money || 0).toFixed(2)}`}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
