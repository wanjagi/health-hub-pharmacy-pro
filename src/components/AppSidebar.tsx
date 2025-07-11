
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  ShoppingCart,
  BarChart3,
  Pill,
  Truck,
  ShoppingBag,
  Receipt,
  Settings,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, roles: ["admin", "pharmacist", "cashier", "supplier"] },
  { title: "Inventory", url: "/inventory", icon: Package, roles: ["admin", "pharmacist"] },
  { title: "Sales", url: "/sales", icon: ShoppingCart, roles: ["admin", "pharmacist", "cashier"] },
  { title: "Customers", url: "/customers", icon: Users, roles: ["admin", "pharmacist", "cashier"] },
  { title: "Prescriptions", url: "/prescriptions", icon: FileText, roles: ["admin", "pharmacist"] },
  { title: "Suppliers", url: "/suppliers", icon: Truck, roles: ["admin", "pharmacist"] },
  { title: "Purchases", url: "/purchases", icon: ShoppingBag, roles: ["admin", "pharmacist"] },
  { title: "Expenses", url: "/expenses", icon: Receipt, roles: ["admin"] },
  { title: "Reports", url: "/reports", icon: BarChart3, roles: ["admin", "pharmacist"] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ["admin"] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { profile } = useAuth();
  const collapsed = state === "collapsed";

  const filteredMenuItems = menuItems.filter(item => 
    !profile?.role || item.roles.includes(profile.role)
  );

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="offcanvas">
      <SidebarContent className="bg-blue-900 text-white">
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center gap-2">
            <Pill className="h-8 w-8 text-blue-300" />
            {!collapsed && (
              <div>
                <h2 className="font-bold text-lg">PharmaCare</h2>
                <p className="text-xs text-blue-300">Management System</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-300">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-800 text-white font-medium"
                            : "text-blue-100 hover:bg-blue-800/50"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
