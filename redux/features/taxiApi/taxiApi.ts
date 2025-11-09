/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tag-types";
import { CreateTaxiData, IVehicle, UpdateTaxiData, UpdateTaxiStatusData } from "@/types/taxis";

const TAXI_PATH = "/taxis";

export const taxiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ➕ Create Taxi
    createTaxi: build.mutation<IVehicle, CreateTaxiData>({
      query: (data) => ({
        url: `${TAXI_PATH}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.taxis],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to create taxi",
      }),
    }),

    // 📄 Get All Taxis
    getAllTaxis: build.query<IVehicle[], void>({
      query: () => ({
        url: `${TAXI_PATH}/get-all-taxis`,
        method: "GET",
      }),
      transformResponse: (response: any) => response || [],
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ taxiId }) => ({
                type: tagTypes.taxis as const,
                id: taxiId,
              })),
              { type: tagTypes.taxis, id: "LIST" },
            ]
          : [{ type: tagTypes.taxis, id: "LIST" }],
    }),

    // 🌐 Get UI Taxis (active only)
    getUiTaxis: build.query<IVehicle[], void>({
      query: () => ({
        url: `${TAXI_PATH}/get-ui-taxis`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data || [],
      providesTags: [{ type: tagTypes.taxis, id: "UI" }],
    }),

    // 🔍 Get Single Taxi
    getSingleTaxi: build.query<IVehicle, string>({
      query: (id) => ({
        url: `${TAXI_PATH}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data || response,
      providesTags: (result, error, id) => [{ type: tagTypes.taxis, id }],
    }),

    // ✏️ Update Taxi
    updateTaxi: build.mutation<IVehicle, { id: string; data: UpdateTaxiData }>({
      query: ({ id, data }) => ({
        url: `${TAXI_PATH}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.taxis, id },
        { type: tagTypes.taxis, id: "LIST" },
        { type: tagTypes.taxis, id: "UI" },
      ],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to update taxi",
      }),
    }),

    // 🔁 Update Taxi Status
    updateTaxiStatus: build.mutation<IVehicle, { id: string; data: UpdateTaxiStatusData }>({
      query: ({ id, data }) => ({
        url: `${TAXI_PATH}/status/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.taxis],
    }),

    // ❌ Delete Taxi
    deleteTaxi: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `${TAXI_PATH}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: tagTypes.taxis, id },
        { type: tagTypes.taxis, id: "LIST" },
        { type: tagTypes.taxis, id: "UI" },
      ],
      transformErrorResponse: (response: any) => ({
        status: response.status,
        message: response.data?.message || "Failed to delete taxi",
      }),
    }),
  }),
});

export const {
  useCreateTaxiMutation,
  useGetAllTaxisQuery,
  useGetUiTaxisQuery,
  useGetSingleTaxiQuery,
  useUpdateTaxiMutation,
  useUpdateTaxiStatusMutation,
  useDeleteTaxiMutation,
} = taxiApi;
