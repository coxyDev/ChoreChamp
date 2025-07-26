import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Users, ClipboardList, Star, Settings, Zap } from "lucide-react";

const ActionButton = ({ icon: Icon, title, description, to, color = "blue" }) => (
  <Link to={to} className="block">
    <Button variant="outline" className="w-full h-auto p-4 hover:shadow-md transition-all duration-300 border-slate-200">
      <div className="flex items-center gap-3 w-full">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div className="text-left flex-1">
          <p className="font-medium text-slate-900">{title}</p>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>
      </div>
    </Button>
  </Link>
);

export default function QuickActions() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-slate-900">
          <Zap className="w-5 h-5 text-yellow-500" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ActionButton
          icon={Users}
          title="Manage Children"
          description="Add or edit child profiles"
          to={createPageUrl("Children")}
          color="blue"
        />
        <ActionButton
          icon={ClipboardList}
          title="Browse Chores"
          description="Find age-appropriate tasks"
          to={createPageUrl("ChoreTemplates")}
          color="green"
        />
        <ActionButton
          icon={Star}
          title="View Achievements"
          description="See completed milestones"
          to={createPageUrl("Achievements")}
          color="purple"
        />
        <ActionButton
          icon={Settings}
          title="Family Settings"
          description="Customize your experience"
          to={createPageUrl("Settings")}
          color="gray"
        />
      </CardContent>
    </Card>
  );
}