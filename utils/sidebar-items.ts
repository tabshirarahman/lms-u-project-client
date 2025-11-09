import {
  Home,
  BarChart3,
  TrendingUp,
  Sliders,
  LucideCarTaxiFront,
  MapPin,
  Car,
  BookOpen,
  ImageIcon,
  Clock,
  UserCheck,
  Calendar,
  Users,
  MessageSquare,
  Ticket,
  Mail,
  Settings,
  Users2,
  ChartSpline,
} from "lucide-react";

export type SidebarMenuItem = {
  title: string;
  url: string;
  icon: React.ElementType;
  badge?: string | null;
};

export type SidebarSection = {
  title: string;
  items: SidebarMenuItem[];
};

export const USER_ROLE = {
  superAdmin: "superadmin",
  admin: "admin",
  user: "user",
};

export const getSidebarItemsByRole = (role: string): SidebarSection[] => {
  const adminMenus: SidebarSection[] = [
    {
      title: "Dashboard",
      items: [
        { title: "Overview", url: "/core/admin", icon: Home },
        { title: "Analytics", url: "/core/admin/analytics", icon: BarChart3 },
        { title: "Reports", url: "/core/admin/reports", icon: TrendingUp },
      ],
    },
    {
      title: "Team Management",
      items: [{ title: "Team", url: "/core/admin/team", icon: Users2 }],
    },
    {
      title: "Website Contents",
      items: [
        { title: "Hero Slider", url: "/core/admin/hero-slides", icon: Sliders },
        { title: "Taxis", url: "/core/admin/taxis", icon: LucideCarTaxiFront },
        { title: "Area We Cover", url: "/core/admin/areas", icon: MapPin },
        { title: "Our Fleet", url: "/core/admin/fleet", icon: Car },
        {
          title: "Blog Posts",
          url: "/core/admin/content/blog",
          icon: BookOpen,
        },
        {
          title: "Media Library",
          url: "/core/admin/content/media",
          icon: ImageIcon,
        },
      ],
    },
    {
      title: "Booking Management",
      items: [
        {
          title: "Pending Bookings",
          url: "/core/admin/bookings/pending",
          icon: Clock,
        },
        {
          title: "Active Minicabs",
          url: "/core/admin/bookings/active",
          icon: Car,
        },
        {
          title: "Completed Bookings",
          url: "/core/admin/bookings/completed",
          icon: UserCheck,
        },
        {
          title: "Cancelled Bookings",
          url: "/core/admin/bookings/cancelled",
          icon: Calendar,
        },
      ],
    },
    {
      title: "Customer Management",
      items: [
        {
          title: "Customer Reviews",
          url: "/core/admin/reviews",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "SEO",
      items: [
        {
          title: "Page Metadata",
          url: "/core/admin/seo-tools/page-metadata",
          icon: Ticket,
        },
      ],
    },
    {
      title: "Support & Communication",
      items: [
        {
          title: "Support Tickets",
          url: "/core/admin/support/tickets",
          icon: Ticket,
        },
        {
          title: "Contact Messages",
          url: "/core/admin/support/messages",
          icon: Mail,
        },
        {
          title: "Live Chat",
          url: "/core/admin/support/chat",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "System Management",
      items: [
        { title: "Manage Users", url: "/core/admin/system/users", icon: Users },
        {
          title: "System Settings",
          url: "/core/admin/system/settings",
          icon: Settings,
        },
      ],
    },
  ];

  const superAdminMenus: SidebarSection[] = [
    {
      title: "Dashboard",
      items: [
        { title: "Overview", url: "/core/superadmin", icon: Home },
        {
          title: "Analytics",
          url: "/core/superadmin/analytics",
          icon: BarChart3,
        },
        { title: "Reports", url: "/core/superadmin/reports", icon: TrendingUp },
      ],
    },
    {
      title: "Team Management",
      items: [{ title: "Team", url: "/core/superadmin/team", icon: Users2 }],
    },
    {
      title: "Website Contents",
      items: [
        {
          title: "Hero Slider",
          url: "/core/superadmin/hero-slides",
          icon: Sliders,
        },
        {
          title: "Taxis",
          url: "/core/superadmin/taxis",
          icon: LucideCarTaxiFront,
        },
        { title: "Area We Cover", url: "/core/superadmin/areas", icon: MapPin },
        { title: "Our Fleet", url: "/core/superadmin/fleet", icon: Car },
        {
          title: "Blog Posts",
          url: "/core/superadmin/content/blog",
          icon: BookOpen,
        },
        {
          title: "Media Library",
          url: "/core/superadmin/content/media",
          icon: ImageIcon,
        },
      ],
    },
    {
      title: "Booking Management",
      items: [
        {
          title: "Pending Bookings",
          url: "/core/superadmin/bookings/pending",
          icon: Clock,
        },
        {
          title: "Active Minicabs",
          url: "/core/superadmin/bookings/active",
          icon: Car,
        },
        {
          title: "Completed Bookings",
          url: "/core/superadmin/bookings/completed",
          icon: UserCheck,
        },
        {
          title: "Cancelled Bookings",
          url: "/core/superadmin/bookings/cancelled",
          icon: Calendar,
        },
      ],
    },
    {
      title: "Customer Management",
      items: [
        // {
        //   title: "All Customers",
        //   url: "/core/superadmin/customers",
        //   icon: Users,
        // },
        {
          title: "Customer Reviews",
          url: "/core/superadmin/reviews",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "SEO",
      items: [
        {
          title: "Page Metadata",
          url: "/core/superadmin/seo-tools/page-metadata",
          icon: Ticket,
        },
        {
          title: "Google Analytics",
          url: "/core/superadmin/seo-tools/google-analytics",
          icon: ChartSpline,
        },
      ],
    },
    {
      title: "Support & Communication",
      items: [
        {
          title: "Support Tickets",
          url: "/core/superadmin/support/tickets",
          icon: Ticket,
        },
        {
          title: "Contact Messages",
          url: "/core/superadmin/support/messages",
          icon: Mail,
        },
        {
          title: "Live Chat",
          url: "/core/superadmin/support/chat",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "System Management",
      items: [
        {
          title: "Manage Users",
          url: "/core/superadmin/system/users",
          icon: Users,
        },
        {
          title: "System Settings",
          url: "/core/superadmin/system/settings",
          icon: Settings,
        },
      ],
    },
  ];

  switch (role) {
    case USER_ROLE.superAdmin:
      return superAdminMenus;
    case USER_ROLE.admin:
      return adminMenus;

    default:
      return [];
  }
};
