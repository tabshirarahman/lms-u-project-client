/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IBlogCategory, IBlogPost, IBlogTag } from "@/types/blog-response";

const BLOG_PATH = "/blog";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Blog Post
    createBlogPost: build.mutation({
      query: (data) => ({
        url: `${BLOG_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // Get All Blog Posts
    getAllBlogPosts: build.query({
      query: (params: Record<string, any> = {}) => ({
        url: `${BLOG_PATH}/get-all-blog-posts`,
        method: "GET",
        params,
      }),
      transformResponse: (response: IBlogPost[]) => ({
        blogs: response,
      }),
      providesTags: [tagTypes.blog],
    }),

    // Get Single Blog Post by ID
    getSingleBlogPost: build.query({
      query: (id: string) => ({
        url: `${BLOG_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // Get Single Blog Post by Slug
    getSingleBlogPostBySlug: build.query({
      query: (slug: string) => ({
        url: `${BLOG_PATH}/get-single-blog-post/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    updateBlogPost: build.mutation({
      query: ({ id, data }) => {
        return {
          url: `${BLOG_PATH}/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.blog],
    }),

    // Update Blog Post Status
    updateBlogPostStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `${BLOG_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // Delete Blog Post
    deleteBlogPost: build.mutation({
      query: (id: string) => ({
        url: `${BLOG_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // Get Blog Categories
    getAllBlogCategories: build.query({
      query: () => ({
        url: `${BLOG_PATH}/get-all-blog-categories`,
        method: "GET",
      }),
      transformResponse: (response: IBlogCategory[]) => response,
      providesTags: [tagTypes.blog],
    }),

    // Get Blog Tags
    getAllBlogTags: build.query({
      query: () => ({
        url: `${BLOG_PATH}/get-all-blog-tags`,
        method: "GET",
      }),
      transformResponse: (response: IBlogTag[]) => response,
      providesTags: [tagTypes.blog],
    }),

    // Get Posts by Category
    getPostsByCategory: build.query({
      query: (category: string) => ({
        url: `${BLOG_PATH}/get-all-category-posts/${category}`,
        method: "GET",
      }),
      transformResponse: (response: IBlogPost[]) => response,
      providesTags: [tagTypes.blog],
    }),

    // Get Posts by Tag
    getPostsByTag: build.query({
      query: (tag: string) => ({
        url: `${BLOG_PATH}/get-all-tag-posts/${tag}`,
        method: "GET",
      }),
      transformResponse: (response: IBlogPost[]) => response,
      providesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateBlogPostMutation,
  useGetAllBlogPostsQuery,
  useGetSingleBlogPostQuery,
  useGetSingleBlogPostBySlugQuery,
  useUpdateBlogPostMutation,
  useUpdateBlogPostStatusMutation,
  useDeleteBlogPostMutation,
  useGetAllBlogCategoriesQuery,
  useGetAllBlogTagsQuery,
  useGetPostsByCategoryQuery,
  useGetPostsByTagQuery,
} = blogApi;
