/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";

const METADATA_PATH = "/page-metadata";

export const metadataApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Page Metadata
    createPageMetadata: build.mutation({
      query: (data) => ({
        url: `${METADATA_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.metadata],
    }),

    // 📄 Get All Page Metadata
    getAllPageMetadata: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${METADATA_PATH}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        metadata: response,
        meta,
      }),
      providesTags: [tagTypes.metadata],
    }),

    // 🔍 Get Single Metadata by Page
    getSinglePageMetadata: build.query({
      query: (page: string) => ({
        url: `${METADATA_PATH}/${page}`,
        method: "GET",
      }),
      providesTags: [tagTypes.metadata],
    }),

    // ✏️ Update Metadata
    updatePageMetadata: build.mutation({
      query: ({ id, data }) => ({
        url: `${METADATA_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.metadata],
    }),

    // 🔁 Update metadata Status
    updatePageMetaStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `${METADATA_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.metadata],
    }),

    // ❌ Soft Delete Metadata (optional)
    deletePageMetadata: build.mutation({
      query: (page: string) => ({
        url: `${METADATA_PATH}/${page}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.metadata],
    }),
  }),
});

export const {
  useCreatePageMetadataMutation,
  useGetAllPageMetadataQuery,
  useGetSinglePageMetadataQuery,
  useUpdatePageMetadataMutation,
  useUpdatePageMetaStatusMutation,
  useDeletePageMetadataMutation,
} = metadataApi;
