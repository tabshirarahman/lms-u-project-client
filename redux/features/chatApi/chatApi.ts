/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";

const CHAT_PATH = "/live-chat";

export const chatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Chat Session
    createChatSession: build.mutation({
      query: (data) => ({
        url: `${CHAT_PATH}/session`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.chat],
    }),

    // 💬 Send Message
    createChatMessage: build.mutation({
      query: (data) => ({
        url: `${CHAT_PATH}/message`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.chat],
    }),

    // 📄 Get All Chat Sessions
    getAllChatSessions: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${CHAT_PATH}/sessions`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        sessions: response,
        meta,
      }),
      providesTags: [tagTypes.chat],
    }),

    // 🔍 Get Single Chat Session
    getChatSession: build.query({
      query: (id: string) => ({
        url: `${CHAT_PATH}/session/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.chat],
    }),

    // 📥 Get Messages of a Session
    getSessionMessages: build.query({
      query: (sessionId: string) => ({
        url: `${CHAT_PATH}/messages/${sessionId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.chat],
    }),
  }),
});

export const {
  useCreateChatSessionMutation,
  useCreateChatMessageMutation,
  useGetAllChatSessionsQuery,
  useGetChatSessionQuery,
  useGetSessionMessagesQuery,
} = chatApi;
