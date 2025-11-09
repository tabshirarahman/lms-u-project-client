export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  avatar: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  isActive: boolean;
  permissions: {
    canManageUsers: boolean;
    canManageContent: boolean;
    canManageSettings: boolean;
    canViewAnalytics: boolean;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    darkMode: boolean;
    language: "en" | "es" | "fr" | "de";
  };
}

export function getProfileData(): ProfileData | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("admin-profile-data");
  return data ? JSON.parse(data) : null;
}

export function updateProfileData(profile: ProfileData): void {
  localStorage.setItem(
    "admin-profile-data",
    JSON.stringify({
      ...profile,
      lastLogin: new Date().toISOString(),
    }),
  );
}
