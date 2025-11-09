/* eslint-disable @typescript-eslint/no-unused-vars */

import type { BaseQueryFn } from "@reduxjs/toolkit/query";

import type { AxiosRequestConfig, AxiosError } from "axios";
import { IMeta } from "@/types/common";
import { instance as axiosInstance } from "./axiosInstance";
export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?: IMeta;
      contentType?: string;
    },
    unknown,
    unknown
  > =>
  async (args) => {
    // Ensure `data` is not undefined
    const { url, method, data = {}, params, headers, contentType } = args;

    try {
      const isFormData = data instanceof FormData;

      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data: Object.keys(data).length ? data : {},
        params,
        headers: {
          ...headers,
          "Content-Type": isFormData ? "multipart/form-data" : "application/json",
        },
      });

      return result;
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
