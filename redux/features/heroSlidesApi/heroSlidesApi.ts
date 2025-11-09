/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";

const HERO_SLIDES_PATH = "/hero-slides";

export const heroSlidesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Hero Slide
    createHeroSlide: build.mutation({
      query: (data) => ({
        url: `${HERO_SLIDES_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.heroSlides],
    }),

    // 📄 Get All Hero Slides
    getAllHeroSlides: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${HERO_SLIDES_PATH}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        slides: response,
        meta,
      }),
      providesTags: [tagTypes.heroSlides],
    }),

    // 🔍 Get Single Slide
    getSingleHeroSlide: build.query({
      query: (id: string) => ({
        url: `${HERO_SLIDES_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.heroSlides],
    }),

    // ✏️ Update Slide
    updateHeroSlide: build.mutation({
      query: ({ id, data }) => ({
        url: `${HERO_SLIDES_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.heroSlides],
    }),

    // 🔁 Update Slide Status
    updateHeroSlideStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `${HERO_SLIDES_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.heroSlides],
    }),

    // ❌ Delete Slide
    deleteHeroSlide: build.mutation({
      query: (id: string) => ({
        url: `${HERO_SLIDES_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.heroSlides],
    }),
  }),
});

export const {
  useCreateHeroSlideMutation,
  useGetAllHeroSlidesQuery,
  useGetSingleHeroSlideQuery,
  useUpdateHeroSlideMutation,
  useUpdateHeroSlideStatusMutation,
  useDeleteHeroSlideMutation,
} = heroSlidesApi;
