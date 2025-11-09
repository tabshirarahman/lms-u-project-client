/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";

const FAQ_PATH = "/faq";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create FAQ
    createFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // 📄 Get All FAQs
    getAllFaqs: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${FAQ_PATH}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        faqs: response,
        meta,
      }),
      providesTags: [tagTypes.faq],
    }),

    // 🔍 Get Single FAQ
    getSingleFaq: build.query({
      query: (id: string) => ({
        url: `${FAQ_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    // ✏️ Update FAQ
    updateFaq: build.mutation({
      query: ({ id, data }) => ({
        url: `${FAQ_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // 🔁 Update FAQ Status
    updateFaqStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `${FAQ_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // ❌ Delete FAQ
    deleteFaq: build.mutation({
      query: (id: string) => ({
        url: `${FAQ_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useCreateFaqMutation,
  useGetAllFaqsQuery,
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
  useUpdateFaqStatusMutation,
  useDeleteFaqMutation,
} = faqApi;
