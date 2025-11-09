/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";

const TEAM_PATH = "/team";

export const teamApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Team Member
    createTeamMember: build.mutation({
      query: (data) => ({
        url: `${TEAM_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.team],
    }),

    // 📄 Get All Team Members
    getAllTeamMembers: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${TEAM_PATH}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        members: response,
        meta,
      }),
      providesTags: [tagTypes.team],
    }),

    // 🔍 Get Single Team Member
    getSingleTeamMember: build.query({
      query: (id: string) => ({
        url: `${TEAM_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.team],
    }),

    // ✏️ Update Team Member
    updateTeamMember: build.mutation({
      query: ({ id, data }) => ({
        url: `${TEAM_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.team],
    }),

    // Update Status
    updateTeamMemberStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `${TEAM_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.team],
    }),

    // ❌ Soft Delete Team Member
    deleteTeamMember: build.mutation({
      query: (id: string) => ({
        url: `${TEAM_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.team],
    }),
  }),
});

export const {
  useCreateTeamMemberMutation,
  useGetAllTeamMembersQuery,
  useGetSingleTeamMemberQuery,
  useUpdateTeamMemberMutation,
  useUpdateTeamMemberStatusMutation,
  useDeleteTeamMemberMutation,
} = teamApi;
