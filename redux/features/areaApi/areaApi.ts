/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import type { IMeta } from "@/types";

const AREA_PATH = "/areas";

export const areaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Area
    createArea: build.mutation({
      query: (data) => ({
        url: `${AREA_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.area],
    }),

    // Get All Areas
    getAllAreas: build.query({
      query: (params: Record<string, any>) => ({
        url: `${AREA_PATH}/get-all-areas`,
        method: "GET",
        params,
      }),
      transformResponse: (response: any[], meta: IMeta) => ({
        areas: response,
        meta,
      }),
      providesTags: [tagTypes.area],
    }),

    // Get Single Area by Slug
    getSingleArea: build.query({
      query: (slug: string) => ({
        url: `${AREA_PATH}/get-single-area/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.area],
    }),

    // Update Area
    updateArea: build.mutation({
      query: ({ id, data }) => ({
        url: `${AREA_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.area],
    }),

    // Update Area Status
    updateAreaStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `${AREA_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.area],
    }),

    // Delete Area
    deleteArea: build.mutation({
      query: (id: string) => ({
        url: `${AREA_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.area],
    }),
  }),
});

export const {
  useCreateAreaMutation,
  useGetAllAreasQuery,
  useGetSingleAreaQuery,
  useUpdateAreaMutation,
  useUpdateAreaStatusMutation,
  useDeleteAreaMutation,
} = areaApi;
