import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Users, ClipboardList, Bell, Settings, Star } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "My Children",
    url: createPageUrl("Children"),
    icon: Users,
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

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ backgroundColor: '#F8F9F0' }}>
        <style>
          {`
            :root {
              --background: #F8F9F0;
              --foreground: #2F2F2F;
              --card: #FFFFFF;
              --card-foreground: #2F2F2F;
              --popover: #FFFFFF;
              --popover-foreground: #2F2F2F;
              --primary: #93827F;
              --primary-foreground: #FFFFFF;
              --secondary: #92B4A7;
              --secondary-foreground: #2F2F2F;
              --muted: #BDC4A7;
              --muted-foreground: #5A5A5A;
              --accent: #BDC4A7;
              --accent-foreground: #2F2F2F;
              --destructive: #DA4167;
              --destructive-foreground: #FFFFFF;
              --border: #E2E8F0;
              --input: #BDC4A7;
              --ring: #BDC4A7;
              --radius: 0.75rem;
              
              /* Override component colors */
              --yellow-500: #92B4A7;
              --yellow-600: #7A9B8E;
              --blue-500: #93827F;
              --blue-600: #7A6B68;
              --blue-700: #66524F;
              --green-500: #92B4A7;
              --green-600: #7A9B8E;
              --green-700: #638075;
              --purple-500: #93827F;
              --purple-600: #7A6B68;
              --purple-700: #66524F;
            }
          `}
        </style>
        <Sidebar className="border-r border-slate-200 bg-white/90 backdrop-blur-sm">
          <SidebarHeader className="border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #93827F, #92B4A7)' }}>
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl" style={{ color: '#2F2F2F' }}>ChoreTracker</h2>
                <p className="text-sm" style={{ color: '#5A5A5A' }}>Family Chore Management</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-3 py-2" style={{ color: '#5A5A5A' }}>
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
                            ? 'shadow-sm' 
                            : ''
                        }`}
                        style={{
                          backgroundColor: location.pathname === item.url ? '#BDC4A7' : 'transparent',
                          color: location.pathname === item.url ? '#2F2F2F' : '#2F2F2F'
                        }}
                        onMouseEnter={(e) => {
                          if (location.pathname !== item.url) {
                            e.target.style.backgroundColor = '#F3F5ED';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (location.pathname !== item.url) {
                            e.target.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">{item.title}</span>
                          {item.title === "Notifications" && (
                            <Badge className="ml-auto text-xs" style={{ backgroundColor: '#DA4167', color: 'white' }}>
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
              <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider px-3 py-2" style={{ color: '#5A5A5A' }}>
                Quick Stats
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: '#5A5A5A' }}>Active Children</span>
                    <span className="font-bold" style={{ color: '#2F2F2F' }}>0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: '#5A5A5A' }}>Pending Chores</span>
                    <span className="font-bold" style={{ color: '#DA4167' }}>0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: '#5A5A5A' }}>Points Today</span>
                    <span className="font-bold" style={{ color: '#92B4A7' }}>0</span>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #BDC4A7, #93827F)' }}>
                <span className="font-semibold text-sm" style={{ color: '#2F2F2F' }}>P</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate" style={{ color: '#2F2F2F' }}>Parent Account</p>
                <p className="text-xs truncate" style={{ color: '#5A5A5A' }}>Manage your family</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold" style={{ color: '#2F2F2F' }}>ChoreTracker</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}