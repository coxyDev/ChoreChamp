import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Home, 
  Users, 
  ClipboardList, 
  Bell, 
  Settings, 
  Trophy,
  Menu,
  X,
  User
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Children",
    url: createPageUrl("Children"),
    icon: Users,
  },
  {
    title: "Child Profile", 
    url: createPageUrl("ChildProfile"),
    icon: User,
  },
  {
    title: "Chore Templates",
    url: createPageUrl("ChoreTemplates"),
    icon: ClipboardList,
  },
  {
    title: "Notifications",
    url: createPageUrl("Notifications"),
    icon: Bell,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: Settings,
  }
];

const MobileSidebar = ({ isOpen, onClose, location }) => (
  <>
    {/* Overlay */}
    {isOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-40 md:hidden" 
        onClick={onClose}
      />
    )}
    
    {/* Mobile Sidebar */}
    <div className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-card transform transition-transform duration-300 ease-in-out md:hidden
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center chorechamp-gradient">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-foreground">ChoreChamp</h2>
              <p className="text-xs text-muted-foreground">Family Chore Management</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 text-muted-foreground">
              Navigation
            </p>
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group
                  ${location.pathname === item.url 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-accent hover:text-accent-foreground'
                  }
                `}
              >
                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{item.title}</span>
                {item.title === "Notifications" && (
                  <Badge className="ml-auto text-xs bg-destructive text-destructive-foreground">
                    3
                  </Badge>
                )}
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 text-muted-foreground">
              Quick Stats
            </p>
            <div className="bg-accent/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active Children</span>
                <span className="font-bold text-foreground">0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Pending Chores</span>
                <span className="font-bold text-destructive">0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Points Today</span>
                <span className="font-bold text-primary">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center chorechamp-gradient">
              <span className="font-semibold text-sm text-white">P</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate text-foreground">Parent Account</p>
              <p className="text-xs truncate text-muted-foreground">Manage your family</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

const DesktopSidebar = ({ location }) => (
  <div className="hidden md:flex w-64 bg-card border-r border-border">
    <div className="flex flex-col w-full">
      {/* Desktop Header */}
      <div className="border-b border-border p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg chorechamp-gradient">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-foreground">ChoreChamp</h2>
            <p className="text-sm text-muted-foreground">Family Chore Management</p>
          </div>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 text-muted-foreground">
            Navigation
          </p>
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl mb-1 group transition-all duration-300
                ${location.pathname === item.url 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-accent hover:text-accent-foreground'
                }
              `}
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">{item.title}</span>
              {item.title === "Notifications" && (
                <Badge className="ml-auto text-xs bg-destructive text-destructive-foreground">
                  3
                </Badge>
              )}
            </Link>
          ))}
        </div>

        {/* Desktop Quick Stats */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wider px-3 py-2 text-muted-foreground">
            Quick Stats
          </p>
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Active Children</span>
              <span className="font-bold text-foreground">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pending Chores</span>
              <span className="font-bold text-destructive">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Points Today</span>
              <span className="font-bold text-primary">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center chorechamp-gradient">
            <span className="font-semibold text-sm text-white">P</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate text-foreground">Parent Account</p>
            <p className="text-xs truncate text-muted-foreground">Manage your family</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Layout({ children }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        location={location}
      />

      {/* Desktop Sidebar */}
      <DesktopSidebar location={location} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-card/90 backdrop-blur-sm border-b border-border px-4 py-3 md:hidden">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="hover:bg-accent -ml-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground">ChoreChamp</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}