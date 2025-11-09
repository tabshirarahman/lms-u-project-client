import { DashboardLayoutWrapper } from "@/components/dashboard/DashboardLayoutWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // For now, hardcode; later fetch from auth session or Redux
  const role: "user" | "admin" = "user";

  return <DashboardLayoutWrapper role={role}>{children}</DashboardLayoutWrapper>;
}
