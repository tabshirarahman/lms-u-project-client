import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Admin
    createAdmin: build.mutation({
      query: (data) => ({
        url: "/register/create-admin",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getSingleUser: build.query({
      query: () => ({
        url: "/register/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetSingleUserQuery, useCreateAdminMutation } = userApi;
