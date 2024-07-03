"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";

import treeReducer from "./features/tree-Slice";
import { rolesApi } from "@/services/rolesApi";
import { managedEmployeeApi } from "@/services/managedEmployeeApi";
import { employeeApi } from "@/services/employeeApi";

export const store = configureStore({
  reducer: {
    authReducer,

    [employeeApi.reducerPath]: employeeApi.reducer,
    [rolesApi.reducerPath]: rolesApi.reducer,
    [managedEmployeeApi.reducerPath]: managedEmployeeApi.reducer,

    treeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      rolesApi.middleware,
      employeeApi.middleware,
      managedEmployeeApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
