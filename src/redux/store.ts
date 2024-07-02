"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import employeeReducer from "./features/employee-slice";
import managedEmployeeReducer from "./features/managedEmployee-slice";
import roleReducer from "./features/role-slice";
import treeReducer from "./features/tree-Slice";

export const store = configureStore({
  reducer: {
    authReducer,
    employeeReducer,
    roleReducer,
    managedEmployeeReducer,
    treeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
