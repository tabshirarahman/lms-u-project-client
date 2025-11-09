/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
/**
 * Helper function to register a user based on the given endpoint and data.
 * @param endpoint - The specific API endpoint for registration.
 * @param data - The user data to send.
 * @returns The response from the backend.
 */
const registerUser = async (endpoint: string, data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to register user: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, message: (error as Error).message };
  }
};

/**
 * Registers a student applicant.
 * @param data - The data for the student applicant.
 */
export const registerCustomer = async (data: any) => {
  return registerUser("register/create-user", data);
};
/**
 * Registers a student applicant.
 * @param data - The data for the student applicant.
 */
export const registerAdmin = async (data: any) => {
  return registerUser("register/create-admin", data);
};
