/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
const USER_PATH = "/user";

const usergetApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get All Users
    getAllUsers: build.query({
      query: (params: Record<string, any>) => ({
        url: `${USER_PATH}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        users: response,
        meta,
      }),
      providesTags: [tagTypes.getUser],
    }),

    // Get Single User
    getSingleUserById: build.query({
      query: (id: string) => ({
        url: `${USER_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.getUser],
    }),

    // Update User
    updateUser: build.mutation({
      query: ({ email, data }) => {
        return {
          url: `${USER_PATH}/${email}`,
          method: "PATCH",
          data,
        };
      },
      invalidatesTags: [tagTypes.getUser],
    }),

    // Delete User
    deleteUser: build.mutation({
      query: (id: string) => ({
        url: `${USER_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.getUser],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usergetApi;
