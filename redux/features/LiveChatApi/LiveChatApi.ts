/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";

const CHAT_PATH = "/chat-conversation";

export interface IMessage {
  _id: string;
  content: string;
  image?: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  seen: boolean;
  delivered: boolean;
  messageType: "text" | "image" | "system";
}

export interface IConversation {
  _id: string;
  participants: string[];
  messages: IMessage[];
  lastMessage?: IMessage;
  unreadCount: number;
  isBlocked: boolean;
  blockedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserStatus {
  userId: string;
  isOnline: boolean;
  lastSeen: string;
  isTyping: boolean;
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendMessage: build.mutation({
      query: (data: {
        senderId: string;
        receiverId: string;
        content: string;
        image?: string;
        messageType?: "text" | "image";
      }) => {
        return {
          url: `${CHAT_PATH}/send-message`,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.liveChatApi],
      // Optimistic update for better UX
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // Invalidate conversations to update sidebar
          dispatch(chatApi.util.invalidateTags([tagTypes.liveChatApi]));
        } catch (error) {
          console.error("Failed to send message:", error);
        }
      },
    }),

    // ✅ Get conversation between two users (paginated)
    getConversation: build.query({
      query: (params: { user1: string; user2: string; page?: number; limit?: number }) => ({
        url: `${CHAT_PATH}/conversation`,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => ({
        messages: response?.data?.messages || response?.messages || [],
        conversation: response?.data?.conversation || response?.conversation || null,
        isBlocked: response?.data?.isBlocked || false,
        blockedBy: response?.data?.blockedBy || null,
        meta: response?.meta || {},
      }),
      providesTags: (result, error, arg) => [
        { type: tagTypes.liveChatApi, id: `${arg.user1}-${arg.user2}` },
      ],
    }),

    // ✅ Mark messages as seen
    markMessagesAsSeen: build.mutation({
      query: (data: { senderId: string; receiverId: string }) => ({
        url: `${CHAT_PATH}/seen`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.liveChatApi],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Update conversation cache to reflect seen status
          dispatch(chatApi.util.invalidateTags([tagTypes.liveChatApi]));
        } catch (error) {
          console.error("Failed to mark messages as seen:", error);
        }
      },
    }),

    // ✅ Get all conversations for a specific user (admin)
    getUserConversations: build.query({
      query: (userId: string) => ({
        url: `${CHAT_PATH}/user/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response?.data || response || [],
      providesTags: [tagTypes.liveChatApi],
    }),

    // ✅ Get all conversations (admin/superadmin)
    getAllConversations: build.query({
      query: (params: { refresh?: boolean } = {}) => ({
        url: `${CHAT_PATH}/all`,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        const conversations = response?.data || response || [];
        return conversations.map((conv: any) => ({
          ...conv,
          unreadCount:
            conv.messages?.filter((msg: any) => !msg.seen && msg.receiverId === "admin-01")
              .length || 0,
        }));
      },
      providesTags: [tagTypes.liveChatApi],
    }),

    // ✅ Get user status (online/offline)
    getUserStatus: build.query({
      query: (userId: string) => ({
        url: `${CHAT_PATH}/user-status/${userId}`,
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        isOnline: response?.isOnline || false,
        lastSeen: response?.lastSeen || new Date().toISOString(),
        isTyping: response?.isTyping || false,
      }),
      providesTags: (result, error, userId) => [
        { type: tagTypes.liveChatApi, id: `status-${userId}` },
      ],
    }),

    // ✅ Update typing status
    updateTypingStatus: build.mutation({
      query: (data: { userId: string; conversationId: string; isTyping: boolean }) => ({
        url: `${CHAT_PATH}/typing-status`,
        method: "POST",
        data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tagTypes.liveChatApi, id: `status-${arg.userId}` },
      ],
    }),

    // ✅ Block/Unblock user
    blockUser: build.mutation({
      query: (data: {
        user1: string;
        user2: string;
        action: "block" | "unblock";
        reason?: string;
      }) => ({
        url: `${CHAT_PATH}/block-user`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.liveChatApi],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Refresh conversations and current conversation
          dispatch(chatApi.util.invalidateTags([tagTypes.liveChatApi]));
        } catch (error) {
          console.error("Failed to block/unblock user:", error);
        }
      },
    }),

    // ✅ Check if conversation is blocked
    checkBlockStatus: build.query({
      query: (params: { user1: string; user2: string }) => ({
        url: `${CHAT_PATH}/block-status`,
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => ({
        isBlocked: response?.isBlocked || false,
        blockedBy: response?.blockedBy || null,
        reason: response?.reason || null,
      }),
      providesTags: (result, error, arg) => [
        { type: tagTypes.liveChatApi, id: `block-${arg.user1}-${arg.user2}` },
      ],
    }),

    // ✅ Get chat statistics
    getChatStats: build.query({
      query: () => ({
        url: `${CHAT_PATH}/stats`,
        method: "GET",
      }),
      transformResponse: (response: any) => ({
        totalConversations: response?.totalConversations || 0,
        activeConversations: response?.activeConversations || 0,
        totalMessages: response?.totalMessages || 0,
        averageResponseTime: response?.averageResponseTime || "0m",
        onlineUsers: response?.onlineUsers || 0,
      }),
      providesTags: [tagTypes.liveChatApi],
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetConversationQuery,
  useMarkMessagesAsSeenMutation,
  useGetUserConversationsQuery,
  useGetAllConversationsQuery,
  useGetUserStatusQuery,
  useBlockUserMutation,
  useUpdateTypingStatusMutation,
  useCheckBlockStatusQuery,
  useGetChatStatsQuery,
} = chatApi;
