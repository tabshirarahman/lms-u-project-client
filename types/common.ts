/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { USER_ROLE } from "@/contants/role";

export type IMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type UserRole = keyof typeof USER_ROLE;

export interface DrawerItem {
  title: string;
  path?: string;
  parentPath?: string;
  icon?: React.ElementType;
  children?: DrawerItem[];
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
