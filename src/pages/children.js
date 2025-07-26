import React, { useState, useEffect } from "react";
import { Child, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Users, UserPlus } from "lucide-react";

import ChildCard from "../components/children/ChildCard";
import AddChildForm from "../components/children/AddChildForm";

export default function Children() {
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    loadChildren();
  }, []);

  const loadChildren = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);
      const childrenData = await Child.filter({ parent_email: user.email });
      setChildren(childrenData);
    } catch (error) {
      console.error("Error loading children:", error);
    }
    setIsLoading(false);
  };

  const handleAddChild = async (childData) => {
    try {
      const newChild = await Child.create({
        ...childData,
        parent_email: currentUser.email,
        total_points: 0,
        total_money: 0,
        level: 1
      });
      setChildren([...children, newChild]);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding child:", error);
    }
  };

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="p-6 space-y-6 bg-background min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Children</h1>
          <p className="text-lg mt-2 text-muted-foreground">
            Manage your family members and track their progress.
          </p>
        </div>
        
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Child
        </Button>
      </motion.div>

      {/* Search */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search children..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-border focus:ring-ring"
          />
        </div>
      </motion.div>

      {/* Children Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {filteredChildren.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredChildren.map((child, index) => (
                <ChildCard
                  key={child.id}
                  child={child}
                  choreCount={0} // You can calculate this from chores data
                  completedToday={0} // You can calculate this from chores data
                  delay={index * 0.1}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <Card className="border-0 shadow-md">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {searchTerm ? 'No children found' : 'No children added yet'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm 
                  ? 'Try adjusting your search terms to find the child you\'re looking for.'
                  : 'Start by adding your first child to begin tracking chores!'
                }
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setShowAddForm(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Your First Child
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Add Child Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <AddChildForm
            onSubmit={handleAddChild}
            onCancel={() => setShowAddForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}