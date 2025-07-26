
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, UserPlus, Edit, DollarSign } from "lucide-react";

const avatarColors = [
  { name: "Sage", value: "sage", class: "bg-[#BDC4A7]" },
  { name: "Sea Green", value: "sea", class: "bg-[#92B4A7]" },
  { name: "Mauve", value: "mauve", class: "bg-[#93827F]" },
  { name: "Coral", value: "coral", class: "bg-[#DA4167]" },
  { name: "Charcoal", value: "charcoal", class: "bg-[#2F2F2F]" },
  { name: "Cream", value: "cream", class: "bg-[#F3F5D2]" },
  { name: "Dusty Rose", value: "dusty", class: "bg-[#D4A5A5]" },
  { name: "Olive", value: "olive", class: "bg-[#A8B89A]" },
];

export default function AddChildForm({ child, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: child?.name || "",
    age: child?.age || 4,
    avatar_color: child?.avatar_color || "sage",
    weekly_pocket_money: child?.weekly_pocket_money ?? 4
  });

  useEffect(() => {
    if (!child) { // Only auto-update for new children
        setFormData(prev => ({ ...prev, weekly_pocket_money: prev.age }));
    }
  }, [formData.age, child]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-8"
    >
      <Card className="border-0 shadow-lg">
        <CardHeader style={{ backgroundColor: '#F3F5ED' }}>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-xl font-bold" style={{ color: '#2F2F2F' }}>
              {child ? <Edit className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              {child ? "Edit Child" : "Add New Child"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium" style={{ color: '#5A5A5A' }}>
                  Child's Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter child's name"
                  className="border-slate-300"
                  style={{ borderColor: '#BDC4A7' }}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium" style={{ color: '#5A5A5A' }}>
                  Age *
                </Label>
                <Select
                  value={formData.age.toString()}
                  onValueChange={(value) => handleInputChange("age", parseInt(value))}
                >
                  <SelectTrigger className="border-slate-300" style={{ borderColor: '#BDC4A7' }}>
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 13 }, (_, i) => i + 4).map((age) => (
                      <SelectItem key={age} value={age.toString()}>
                        {age} years old
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pocket_money" className="text-sm font-medium" style={{ color: '#5A5A5A' }}>
                  Weekly Pocket Money
                </Label>
                 <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#5A5A5A' }} />
                    <Input
                        id="pocket_money"
                        type="number"
                        value={formData.weekly_pocket_money}
                        onChange={(e) => handleInputChange("weekly_pocket_money", parseFloat(e.target.value) || 0)}
                        className="pl-9 border-slate-300"
                        style={{ borderColor: '#BDC4A7' }}
                    />
                 </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium" style={{ color: '#5A5A5A' }}>
                Avatar Color
              </Label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {avatarColors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleInputChange("avatar_color", color.value)}
                    className={`w-12 h-12 rounded-full ${color.class} flex items-center justify-center transition-all duration-200 ${
                      formData.avatar_color === color.value
                        ? "ring-4 ring-[#93827F] scale-110"
                        : "hover:scale-105"
                    }`}
                  >
                    <span className="text-white font-semibold">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name.trim()}
                style={{ backgroundColor: '#93827F', color: 'white' }}
                className="hover:opacity-90"
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
