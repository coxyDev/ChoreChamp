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
  const [child, setChild] = useState(null);
  const [chores, setChores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const childId = new URLSearchParams(location.search).get("childId");

  useEffect(() => {
    if (childId) {
      loadProfileData();
    }
  }, [childId]);

  const loadProfileData = async () => {
    setIsLoading(true);
    try {
      const [childData, choresData] = await Promise.all([
        Child.get(childId),
        Chore.filter({ assigned_to: childId }, "-created_date")
      ]);
      setChild(childData);
      setChores(choresData);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
    setIsLoading(false);
  };
  
  const handleVerifyChore = async (choreId) => {
    const choreToVerify = chores.find(c => c.id === choreId);
    if (!choreToVerify || choreToVerify.status !== 'completed') return;

    try {
      const updatedChore = await Chore.update(choreId, { status: 'verified' });
      
      const childUpdateData = {
        total_points: (child.total_points || 0) + choreToVerify.points,
      };
      
      const newLevel = Math.floor(childUpdateData.total_points / 100) + 1;
      if (newLevel > (child.level || 1)) {
        childUpdateData.level = newLevel;
      }
      
      const updatedChild = await Child.update(childId, childUpdateData);

      setChild(updatedChild);
      setChores(chores.map(c => c.id === choreId ? updatedChore : c));

    } catch (error) {
      console.error("Error verifying chore:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6" style={{ backgroundColor: '#F8F9F0', minHeight: '100vh' }}>
        <div className="animate-pulse">
          <div className="h-8 rounded w-1/3 mb-6" style={{ backgroundColor: '#BDC4A7' }}></div>
          <div className="h-64 rounded-xl" style={{ backgroundColor: '#BDC4A7' }}></div>
        </div>
      </div>
    );
  }

  if (!child) {
    return (
      <div className="p-6" style={{ backgroundColor: '#F8F9F0', minHeight: '100vh' }}>
        <p style={{ color: '#2F2F2F' }}>Child not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto" style={{ backgroundColor: '#F8F9F0', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to={createPageUrl("Children")}>
          <Button variant="ghost">
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