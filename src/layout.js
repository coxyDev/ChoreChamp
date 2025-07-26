import React from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Home, 
  Users, 
  ClipboardList, 
  User, 
  Settings, 
  Bell,
  Trophy
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Children",
    url: "/children", 
    icon: Users,
  },
  {
    title: "Child Profile",
    url: "/child-profile",
    icon: User,
  },
  {
    title: "Chore Templates",
    url: "/chore-templates",
    icon: ClipboardList,
  },
  {
    title: "Settings", 
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-6">
            <div className="flex items-center gap-3">
              {/* ChoreChamp Logo */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg chorechamp-gradient">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-chorechamp-navy">ChoreChamp</h2>
                <p className="text-sm text-muted-foreground">Family Chore Management</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-3 py-2 text-muted-foreground">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`transition-all duration-300 rounded-xl mb-1 group ${
                          location.pathname === item.url 
                            ? 'bg-primary text-primary-foreground shadow-sm' 
                            : 'hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">{item.title}</span>
                          {item.title === "Notifications" && (
                            <Badge className="ml-auto text-xs bg-destructive text-destructive-foreground">
                              3
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-3 py-2 text-muted-foreground">
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
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
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center chorechamp-gradient">
                <span className="font-semibold text-sm text-white">P</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate text-foreground">Parent Account</p>
                <p className="text-xs truncate text-muted-foreground">Manage your family</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-background/90 backdrop-blur-sm border-b px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-accent p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-foreground">ChoreChamp</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto bg-muted/30">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}