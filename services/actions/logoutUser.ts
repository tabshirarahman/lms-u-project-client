import { authKey } from "@/contants/authkey";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookies";

/**
 * Logs the user out by removing tokens, updating auth state, and navigating home.
 * @param router - Next.js AppRouterInstance
 * @param setIsAuthenticated - Function to update auth context
 */

export const logoutUser = async (
  router: AppRouterInstance,
  setIsAuthenticated: (val: boolean) => void,
) => {
  localStorage.removeItem(authKey);
  deleteCookies([authKey, "refreshToken", "accessToken"]);
  setIsAuthenticated(false);
  router.push("/");
  router.refresh();
};
