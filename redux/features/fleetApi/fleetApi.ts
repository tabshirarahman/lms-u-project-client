/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";

const FLEET_PATH = "/fleet";

export const fleetApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Vehicle
    createVehicle: build.mutation({
      query: (data) => ({
        url: `${FLEET_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.fleet],
    }),

    // 🔁 Update Vehicle
    updateVehicle: build.mutation({
      query: ({ id, data }) => ({
        url: `${FLEET_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.fleet],
    }),

    // ❌ Soft Delete Vehicle
    deleteVehicle: build.mutation({
      query: (id: string) => ({
        url: `${FLEET_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.fleet],
    }),

    // 📄 Get All Vehicles
    getAllVehicles: build.query({
      query: (params?: Record<string, any>) => ({
        url: `${FLEET_PATH}/get-all-vehicles`,
        method: "GET",
        params,
      }),
      transformResponse: (response: [], meta: IMeta) => ({
        vehicles: response,
        meta,
      }),
      providesTags: [tagTypes.fleet],
    }),

    // 🔍 Get Single Vehicle
    getSingleVehicle: build.query({
      query: (id: string) => ({
        url: `${FLEET_PATH}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.fleet],
    }),
  }),
});

export const {
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useGetAllVehiclesQuery,
  useGetSingleVehicleQuery,
} = fleetApi;
