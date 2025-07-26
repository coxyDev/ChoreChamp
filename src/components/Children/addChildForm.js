import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, User, DollarSign } from "lucide-react";

const avatarColors = {
  teal: "bg-primary",           // Logo teal
  gold: "bg-secondary",         // Logo gold
  navy: "bg-[hsl(var(--foreground))]",  // Logo navy
  orange: "bg-chorechamp-orange", // From Tailwind config
  muted: "bg-muted",
  accent: "bg-accent",
  purple: "bg-[#9333ea]",       // Keep for variety
  pink: "bg-[#ec4899]",         // Keep for variety
  green: "bg-[#22c55e]",        // Keep for variety
  red: "bg-destructive"         // Use system destructive
};

export default function AddChildForm({ onSubmit, onCancel, child = null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: child?.name || "",
    age: child?.age || "",
    avatar_color: child?.avatar_color || "blue",
    weekly_pocket_money: child?.weekly_pocket_money || 0
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md max-h-[90vh] overflow-auto border-0 shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl font-bold text-foreground">
            {child ? "Edit Child" : "Add New Child"}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCancel}
            className="hover:bg-accent -mr-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Child's Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter child's name"
                  className="pl-10 border-border focus:ring-ring min-h-[44px] sm:min-h-[36px]"
                  required
                />
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-2">
              <Label htmlFor="age" className="text-sm font-medium text-foreground">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                min="3"
                max="18"
                value={formData.age}
                onChange={(e) => handleInputChange("age", parseInt(e.target.value) || "")}
                placeholder="Enter age"
                className="border-border focus:ring-ring min-h-[44px] sm:min-h-[36px]"
                required
              />
            </div>

            {/* Weekly Allowance */}
            <div className="space-y-2">
              <Label htmlFor="pocket_money" className="text-sm font-medium text-foreground">
                Weekly Pocket Money
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="pocket_money"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.weekly_pocket_money}
                  onChange={(e) => handleInputChange("weekly_pocket_money", parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                  className="pl-10 border-border focus:ring-ring min-h-[44px] sm:min-h-[36px]"
                />
              </div>
            </div>

            {/* Avatar Color Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground">
                Avatar Color
              </Label>
              <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 sm:gap-3">
                {avatarColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleInputChange("avatar_color", color.value)}
                    className={`
                      aspect-square w-full rounded-full ${color.class} flex items-center justify-center 
                      transition-all duration-200 min-h-[44px] sm:min-h-[40px]
                      ${formData.avatar_color === color.value
                        ? "ring-4 ring-primary scale-110 shadow-lg"
                        : "hover:scale-105 shadow-md"
                      }
                    `}
                    title={color.name}
                  >
                    <span className="text-white font-semibold text-sm sm:text-base">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
                className="w-full sm:w-auto border-border hover:bg-accent hover:text-accent-foreground min-h-[44px] sm:min-h-[36px]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name.trim()}
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px] sm:min-h-[36px]"
              >
                {isSubmitting ? "Saving..." : child ? "Update Child" : "Add Child"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}