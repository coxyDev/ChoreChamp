import React, { useState, useEffect } from "react";
import { Child, User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Edit, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import AddChildForm from "../components/children/AddChildForm";
import ChildCard from "../components/children/ChildCard";

export default function Children() {
  const [children, setChildren] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
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
      await Child.create({
        ...childData,
        parent_email: currentUser.email,
        total_points: 0,
        level: 1
      });
      setShowAddForm(false);
      loadChildren();
    } catch (error) {
      console.error("Error adding child:", error);
    }
  };

  const handleEditChild = async (childData) => {
    try {
      await Child.update(editingChild.id, childData);
      setEditingChild(null);
      loadChildren();
    } catch (error) {
      console.error("Error updating child:", error);
    }
  };

  const handleDeleteChild = async (childId) => {
    if (window.confirm("Are you sure you want to remove this child? This will also remove all their chores.")) {
      try {
        await Child.delete(childId);
        loadChildren();
      } catch (error) {
        console.error("Error removing child:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-6"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Children</h1>
          <p className="text-slate-600 mt-1">
            Manage your children's profiles and track their progress.
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Child
        </Button>
      </motion.div>

      <AnimatePresence>
        {(showAddForm || editingChild) && (
          <AddChildForm
            child={editingChild}
            onSubmit={editingChild ? handleEditChild : handleAddChild}
            onCancel={() => {
              setShowAddForm(false);
              setEditingChild(null);
            }}
          />
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {children.map((child, index) => (
            <ChildCard
              key={child.id}
              child={child}
              delay={index * 0.1}
              onEdit={() => setEditingChild(child)}
              onDelete={() => handleDeleteChild(child.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {children.length === 0 && !showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Users className="w-24 h-24 text-slate-300 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-slate-700 mb-2">No children added yet</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Start building your family's chore tracking system by adding your first child. 
            You can customize their profile and assign age-appropriate tasks.
          </p>
          <Button
            onClick={() => setShowAddForm(true)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Child
          </Button>
        </motion.div>
      )}
    </div>
  );
}