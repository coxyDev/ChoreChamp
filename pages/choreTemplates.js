import React, { useState, useEffect } from "react";
import { Chore, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Plus, SlidersHorizontal, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChoreTemplateCard from "../components/chores/ChoreTemplateCard";

const CATEGORIES = ["bedroom", "kitchen", "bathroom", "living_room", "outdoor", "pets", "self_care", "academic", "other"];

export default function ChoreTemplates() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    age: "all",
    category: "all",
    search: ""
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);
      const choreTemplates = await Chore.filter({ is_template: true });
      setTemplates(choreTemplates);
    } catch (error) {
      console.error("Error loading chore templates:", error);
    }
    setIsLoading(false);
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredTemplates = templates.filter(t => {
    const ageMatch = filters.age === "all" || (t.min_age <= filters.age && t.max_age >= filters.age);
    const categoryMatch = filters.category === "all" || t.category === filters.category;
    const searchMatch = !filters.search || t.title.toLowerCase().includes(filters.search.toLowerCase());
    return ageMatch && categoryMatch && searchMatch;
  });
  
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Chore Library</h1>
          <p className="text-slate-600 mt-1">
            Browse age-appropriate chores to assign to your children.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Create Custom Chore
        </Button>
      </motion.div>

      <Card className="border-0 shadow-md p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search for chores..." 
              className="pl-9"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <Select onValueChange={(v) => handleFilterChange('age', v)} defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by age" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              {Array.from({ length: 13 }, (_, i) => i + 4).map(age => (
                <SelectItem key={age} value={age.toString()}>{age} years old</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(v) => handleFilterChange('category', v)} defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(cat => (
                 <SelectItem key={cat} value={cat}>{cat.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>
      
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-48 bg-slate-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <ChoreTemplateCard 
              key={template.id} 
              chore={template} 
              delay={index * 0.05} 
            />
          ))}
        </div>
      )}
    </div>
  );
}