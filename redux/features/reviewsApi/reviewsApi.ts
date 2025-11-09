/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import type {
  IReview,
  CreateReviewData,
  UpdateReviewData,
  UpdateReviewStatusData,
  ReviewsResponse,
  ReviewFilters,
} from "@/types/dynamic-review";

const REVIEWS_PATH = "/reviews";

export const reviewsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Review/Testimonial
    createReview: build.mutation<IReview, CreateReviewData>({
      query: (data) => ({
        url: `${REVIEWS_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.reviews],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to create review",
      }),
    }),

    // 📄 Get All Reviews with pagination and filters
    getAllReviews: build.query<ReviewsResponse, ReviewFilters | void>({
      query: (params = {}) => ({
        url: `${REVIEWS_PATH}/get-all-reviews`,
        method: "GET",
        params: {
          page: 1,
          limit: 10,
          ...params,
        },
      }),
      transformResponse: (response: any) => {
        return {
          reviews: response.data || response || [],
          meta: response.meta || {
            page: 1,
            limit: 10,
            total: response.data?.length || 0,
            totalPages: 1,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.reviews.map(({ _id }) => ({
                type: tagTypes.reviews as const,
                id: _id,
              })),
              { type: tagTypes.reviews, id: "LIST" },
            ]
          : [{ type: tagTypes.reviews, id: "LIST" }],
    }),

    // 🌐 Get UI Reviews (active only)
    getUIReviews: build.query<IReview[], void>({
      query: () => ({
        url: `${REVIEWS_PATH}/get-all-ui-reviews`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data || response || [],
      providesTags: [{ type: tagTypes.reviews, id: "UI" }],
    }),

    // 🔍 Get Single Review
    getSingleReview: build.query<IReview, string>({
      query: (id) => ({
        url: `${REVIEWS_PATH}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data || response,
      providesTags: (result, error, id) => [{ type: tagTypes.reviews, id }],
    }),

    // ✏️ Update Review
    updateReview: build.mutation<IReview, { id: string; data: UpdateReviewData }>({
      query: ({ id, data }) => ({
        url: `${REVIEWS_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.reviews, id },
        { type: tagTypes.reviews, id: "LIST" },
        { type: tagTypes.reviews, id: "UI" },
      ],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to update review",
      }),
    }),

    // 🔁 Update Review Status
    updateReviewStatus: build.mutation<IReview, { id: string; data: UpdateReviewStatusData }>({
      query: ({ id, data }) => ({
        url: `${REVIEWS_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.reviews, id },
        { type: tagTypes.reviews, id: "LIST" },
        { type: tagTypes.reviews, id: "UI" },
      ],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to update review status",
      }),
    }),

    // ❌ Delete Review (soft delete)
    deleteReview: build.mutation({
      query: (id: string) => ({
        url: `${REVIEWS_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reviews],
    }),

    // 📊 Get Reviews Statistics
    getReviewsStats: build.query<
      {
        updatedAt: number;
        total: number;
        active: number;
        inactive: number;
        averageRating: number;
        ratingDistribution: { [key: number]: number };
      },
      void
    >({
      query: () => ({
        url: `${REVIEWS_PATH}/stats`,
        method: "GET",
      }),
      transformResponse: (response: any) =>
        response.data || {
          total: 0,
          active: 0,
          inactive: 0,
          averageRating: 0,
          ratingDistribution: {},
        },
      providesTags: [{ type: tagTypes.reviews, id: "STATS" }],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetUIReviewsQuery,
  useGetSingleReviewQuery,
  useUpdateReviewMutation,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation,
  useGetReviewsStatsQuery,
} = reviewsApi;
