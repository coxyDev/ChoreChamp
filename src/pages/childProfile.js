import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Child, Chore, User } from "@/entities/all";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

import ChildProfileHeader from "../components/children/ChildProfileHeader";
import ChildChoreList from "../components/children/ChildChoreList";

export default function ChildProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const childId = searchParams.get('childId');
  
  const [child, setChild] = useState(null);
  const [chores, setChores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (childId) {
      loadChildData();
    }
  }, [childId]);

  const loadChildData = async () => {
    setIsLoading(true);
    try {
      const user = await User.me();
      setCurrentUser(user);
      
      const [childData, choresData] = await Promise.all([
        Child.get(childId),
        Chore.filter({ assigned_to: childId, parent_email: user.email })
      ]);
      
      setChild(childData);
      setChores(choresData);
    } catch (error) {
      console.error("Error loading child data:", error);
    }
    setIsLoading(false);
  };

  const handleVerifyChore = async (choreId) => {
    try {
      const updatedChore = await Chore.update(choreId, { 
        status: 'verified',
        verified_date: new Date().toISOString()
      });
      
      // Update local state
      setChores(chores.map(c => c.id === choreId ? updatedChore : c));

    } catch (error) {
      console.error("Error verifying chore:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 rounded w-1/3 mb-6 bg-muted"></div>
          <div className="h-64 rounded-xl bg-muted"></div>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="p-6 bg-background min-h-screen">
        <p className="text-foreground">Child not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto bg-background min-h-screen">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to={createPageUrl("Children")}>
          <Button variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Children
          </Button>
        </Link>
      </motion.div>
      
      <ChildProfileHeader child={child} />
      
      <ChildChoreList chores={chores} onVerify={handleVerifyChore} childId={childId} />
    </div>
  );
}