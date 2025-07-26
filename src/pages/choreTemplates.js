import React, { useState, useEffect } from "react";
import { Chore, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, SlidersHorizontal, Search, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ChoreTemplateCard from "../components/chores/ChoreTemplateCard";

export default function ChoreTemplates() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedAgeRange, setSelectedAgeRange] = useState("all");
  const [currentUser, setCurrentUser] = useState(null);

  const categories = ['all', 'kitchen', 'bedroom', 'bathroom', 'living-room', 'outdoor', 'pets', 'organization'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];
  const ageRanges = ['all', '4-7', '8-12', '13-16', '17+'];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);
      const templatesData = await Chore.filter({ is_template: true });
      setTemplates(templatesData);
    } catch (error) {
      console.error("Error loading templates:", error);
    }
    setIsLoading(false);
  };

  const handleAssignToChild = async (template, childId) => {
    try {
      await Chore.create({
        ...template,
        id: undefined, // Remove template ID
        assigned_to: childId,
        is_template: false,
        status: 'pending',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        parent_email: currentUser.email
      });
      // Show success message or redirect
    } catch (error) {
      console.error("Error assigning chore:", error);
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty;
    
    let matchesAgeRange = true;
    if (selectedAgeRange !== 'all') {
      const [minAge, maxAge] = selectedAgeRange.includes('+') 
        ? [parseInt(selectedAgeRange), 100]
        : selectedAgeRange.split('-').map(Number);
      matchesAgeRange = template.min_age <= maxAge && template.max_age >= minAge;
    }
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesAgeRange;
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-background min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto bg-background min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chore Templates</h1>
          <p className="text-lg mt-2 text-muted-foreground">
            Browse age-appropriate chores and assign them to your children.
          </p>
        </div>
        
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Custom Chore
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search chores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border focus:ring-ring"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Difficulty Filter */}
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Age Range Filter */}
              <Select value={selectedAgeRange} onValueChange={setSelectedAgeRange}>
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="Age Range" />
                </SelectTrigger>
                <SelectContent>
                  {ageRanges.map(range => (
                    <SelectItem key={range} value={range}>
                      {range === 'all' ? 'All Ages' : `Ages ${range}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Results Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-border">
            {filteredTemplates.length} chore{filteredTemplates.length !== 1 ? 's' : ''} found
          </Badge>
          {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedAgeRange !== 'all') && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedAgeRange('all');
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear filters
            </Button>
          )}
        </div>
      </motion.div>

      {/* Templates Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredTemplates.map((template, index) => (
                <ChoreTemplateCard
                  key={template.id}
                  template={template}
                  onAssign={handleAssignToChild}
                  delay={index * 0.05}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <Zap className="w-16 h-16 text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">No chores found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters or search terms to find the perfect chores for your family.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                  setSelectedAgeRange('all');
                }}
                variant="outline"
                className="border-border hover:bg-accent hover:text-accent-foreground"
              >
                Show All Chores
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}