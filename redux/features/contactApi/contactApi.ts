/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import type {
  IContact,
  IContactFilters,
  IContactResponse,
  IUpdateContactStatus,
} from "@/types/contact";

const CONTACT_PATH = "/contact";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Contact
    createContact: build.mutation<IContact, Partial<IContact>>({
      query: (data) => ({
        url: `${CONTACT_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.contact],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to create contact",
      }),
    }),

    // 📄 Get All Contacts (with optional filters/pagination)
    getAllContacts: build.query<IContactResponse, IContactFilters>({
      query: (params = {}) => ({
        url: `${CONTACT_PATH}`,
        method: "GET",
        params: {
          page: 1,
          limit: 10,
          ...params,
        },
      }),
      transformResponse: (response: any) => ({
        submissions: response.data || response || [],
        meta: response.meta || {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.submissions.map(({ _id }) => ({
                type: tagTypes.contact as const,
                id: _id,
              })),
              { type: tagTypes.contact, id: "LIST" },
            ]
          : [{ type: tagTypes.contact, id: "LIST" }],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to fetch contacts",
      }),
    }),

    // 🔍 Get Single Contact by ID
    getSingleContact: build.query<IContact, string>({
      query: (id) => ({
        url: `${CONTACT_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.contact, id }],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to fetch contact",
      }),
    }),

    // 📩 Get Contacts by User Email
    getUserContactsByEmail: build.query<IContact[], string>({
      query: (email) => ({
        url: `${CONTACT_PATH}/my-contacts?email=${email}`,
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to fetch user contacts",
      }),
    }),

    // ✅ Update Contact Status
    updateContactStatus: build.mutation<IContact, IUpdateContactStatus>({
      query: ({ id, data }) => ({
        url: `${CONTACT_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.contact, id },
        { type: tagTypes.contact, id: "LIST" },
      ],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to update contact status",
      }),
    }),

    // ❌ Delete Contact
    deleteContact: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${CONTACT_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: tagTypes.contact, id },
        { type: tagTypes.contact, id: "LIST" },
      ],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to delete contact",
      }),
    }),

    // 📊 Get Contact Statistics
    getContactStats: build.query<any, void>({
      query: () => ({
        url: `${CONTACT_PATH}/stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.contact],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to fetch contact statistics",
      }),
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetAllContactsQuery,
  useGetSingleContactQuery,
  useGetUserContactsByEmailQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
  useGetContactStatsQuery,
} = contactApi;
