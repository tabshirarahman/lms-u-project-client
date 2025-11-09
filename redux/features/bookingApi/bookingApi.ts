/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";

const BOOKING_PATH = "/bookings";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Booking
    createBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_PATH}/create-booking`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // 📄 Get All Bookings (with optional filters)
    getAllBookings: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${BOOKING_PATH}`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        bookings: response,
        meta,
      }),
      providesTags: [tagTypes.booking],
    }),

    getBookingsByUser: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${BOOKING_PATH}/user-bookings`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        bookings: response,
        meta,
      }),
      providesTags: [tagTypes.booking],
    }),

    // ✏️ Update Booking Invoice
    updateBookingInvoice: build.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_PATH}/by-booking-id/${id}/invoice`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // 🔍 Get Single Booking by ID
    getSingleBooking: build.query({
      query: (id: string) => ({
        url: `${BOOKING_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),

    // ✏️ Update Booking Info
    updateBooking: build.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // 🔁 Update Booking Status
    updateBookingStatus: build.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    deleteBooking: build.mutation({
      query: ({ id, reason }) => ({
        url: `${BOOKING_PATH}/${id}`,
        method: "DELETE",
        body: { reason },
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // 📍 Update Admin/Driver Start Location
    updateAdminStartLocation: build.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_PATH}/${id}/admin-start-location`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),

    // 🛰️ Append Admin/Driver Location Track
    appendAdminLocationTrack: build.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_PATH}/${id}/location-track`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useUpdateBookingInvoiceMutation,
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
  useUpdateBookingStatusMutation,
  useGetBookingsByUserQuery,
  useUpdateAdminStartLocationMutation,
  useAppendAdminLocationTrackMutation,
} = bookingApi;
