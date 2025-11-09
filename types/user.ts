export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "superAdmin";
}

export interface User {
  _id: string;
  user: {
    _id: string;
    email: string;
    role: "user" | "admin" | "superAdmin";
    needsPasswordChange: boolean;
    passwordChangedAt?: string;
    isDeleted: boolean;
    status: "active" | "in-progress" | "blocked";
    createdAt: string;
    updatedAt: string;
  };
  name: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: string;
  email: string;
  phone?: string;
  presentAddress?: string;
  termsAccepted: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  superAdmins: number;
  onlineUsers: number;
}

export interface UpdateUserRoleData {
  email: string;
  user: {
    role: "user" | "admin" | "superAdmin";
  };
}
