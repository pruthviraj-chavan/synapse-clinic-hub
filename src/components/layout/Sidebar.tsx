
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Calendar, MessageSquare, User, Users, Settings, 
  Search, CreditCard, Bell, Home, HelpCircle, BarChart2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const sidebarContext = useSidebar();
  const open = !sidebarContext.state || sidebarContext.state === "expanded";
  const location = useLocation();
  const currentPath = location.pathname;
  const [userRole, setUserRole] = useState<'client' | 'admin' | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role as 'client' | 'admin');
    }
  }, []);

  if (!userRole) return null;

  const menuItems = {
    admin: [
      { title: 'Dashboard', url: '/dashboard', icon: Home },
      { title: 'Appointments', url: '/appointments', icon: Calendar },
      { title: 'Clients', url: '/clients', icon: Users },
      { title: 'Messages', url: '/messages', icon: MessageSquare },
      { title: 'Reports', url: '/reports', icon: BarChart2 },
      { title: 'Payments', url: '/payments', icon: CreditCard },
      { title: 'Settings', url: '/settings', icon: Settings },
    ],
    client: [
      { title: 'Dashboard', url: '/client-dashboard', icon: Home },
      { title: 'Appointments', url: '/client-appointments', icon: Calendar },
      { title: 'Messages', url: '/messages', icon: MessageSquare },
      { title: 'Payments', url: '/payments', icon: CreditCard },
      { title: 'Notifications', url: '/notifications', icon: Bell },
      { title: 'Services', url: '/services', icon: HelpCircle },
      { title: 'Profile', url: '/profile', icon: User },
    ],
  };

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
      isActive ? 'bg-synapse-purple text-white' : 'hover:bg-synapse-purple/10',
    );

  return (
    <Sidebar 
      className={cn(
        "border-r border-border bg-white dark:bg-gray-950",
        open ? "w-64" : "w-14"
      )}
      collapsible="icon"
      defaultCollapsed={false}
    >
      <SidebarContent>
        <SidebarGroup>
          <div className="px-2 py-2">
            <div className="relative rounded-md bg-synapse-purple/5 px-3 py-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                className={cn(
                  "w-full bg-transparent pl-7 text-sm outline-none placeholder:text-muted-foreground",
                  !open && "hidden"
                )}
                placeholder="Search..."
                type="search"
              />
            </div>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel className={!open ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems[userRole].map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={getNavCls}>
                        <item.icon className={cn("h-4 w-4", isActive(item.url) && "text-white")} />
                        {open && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
