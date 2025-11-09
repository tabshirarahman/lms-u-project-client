/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";

const SUPPORT_TICKET_PATH = "/support-tickets";

export const supportTicketApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Support Ticket
    createSupportTicket: build.mutation({
      query: (data) => ({
        url: `${SUPPORT_TICKET_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.supportTicket],
    }),

    // 📄 Get All Support Tickets
    getAllSupportTickets: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${SUPPORT_TICKET_PATH}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        tickets: response,
        meta,
      }),
      providesTags: [tagTypes.supportTicket],
    }),

    // 📧 Get Tickets by Email
    getUserSupportTickets: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${SUPPORT_TICKET_PATH}/user-tickets`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        tickets: response,
        meta,
      }),
      providesTags: [tagTypes.supportTicket],
    }),

    // 🔍 Get Single Ticket
    getSingleSupportTicket: build.query({
      query: (id: string) => ({
        url: `${SUPPORT_TICKET_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.supportTicket],
    }),

    // ✏️ Update Ticket
    updateSupportTicket: build.mutation({
      query: ({ id, data }) => ({
        url: `${SUPPORT_TICKET_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.supportTicket],
    }),

    // 💬 Reply to Ticket
    replyToSupportTicket: build.mutation({
      query: ({ id, data }) => ({
        url: `${SUPPORT_TICKET_PATH}/reply/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.supportTicket],
    }),

    // ❌ Delete Ticket
    deleteSupportTicket: build.mutation({
      query: (id: string) => ({
        url: `${SUPPORT_TICKET_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.supportTicket],
    }),
  }),
});

export const {
  useCreateSupportTicketMutation,
  useGetAllSupportTicketsQuery,
  useGetSingleSupportTicketQuery,
  useUpdateSupportTicketMutation,
  useReplyToSupportTicketMutation,
  useDeleteSupportTicketMutation,
  useGetUserSupportTicketsQuery,
} = supportTicketApi;
