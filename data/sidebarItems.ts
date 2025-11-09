import {
  LayoutDashboard,
  BookOpen,
  Settings,
  Users,
  ClipboardList,
  Brain,
  Target,
  FileText,
  UserCircle2,
} from "lucide-react";

export const sidebarItems = {
  // ================== USER SIDEBAR ==================
  user: [
    { name: "Dashboard", href: "/user", icon: LayoutDashboard },
    { name: "My Courses", href: "/user/courses", icon: BookOpen },
    { name: "User Personas", href: "/user/user-personas", icon: UserCircle2 },
    { name: "Stakeholder Interview", href: "/user/stakeholder-interview", icon: ClipboardList },
    { name: "Surveys", href: "/user/surveys", icon: FileText },
    { name: "Profile", href: "/user/profile", icon: Users },
    { name: "Settings", href: "/user/settings", icon: Settings },
  ],

  // ================== ADMIN SIDEBAR ==================
  admin: [
    { name: "Admin Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Stakeholder Interview", href: "/admin/stakeholder-interview", icon: ClipboardList },
    { name: "Requirements", href: "/admin/requirements", icon: FileText },
    { name: "Brainstorm", href: "/admin/brainstorm", icon: Brain },
    { name: "Competitive Analysis", href: "/admin/competitive-analysis", icon: Target },
    { name: "Manage Users", href: "/admin/manage-users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ],
};
