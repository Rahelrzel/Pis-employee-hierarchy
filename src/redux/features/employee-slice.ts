// import { Employee } from "@/types/employee";
// import { ActionState } from "@/types/state";
// import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { error } from "console";
// import { stat } from "fs";
// import { actionAsyncStorage } from "next/dist/client/components/action-async-storage.external";

// export interface EmployeeState {
//   isLoading: boolean;
//   error?: string;
//   data: Employee[];
//   createState: ActionState;
//   deleteState: ActionState;
// }

// const initialValue: EmployeeState = {
//   createState: {
//     isLoading: false,
//     error: undefined,
//   },
//   deleteState: {
//     isLoading: false,
//     error: undefined,
//   },
//   isLoading: false,
//   error: undefined,
//   data: [],
// };

// const employeesSlice = createSlice({
//   name: "employees",
//   initialState: initialValue,
//   reducers: {
//     loadEmployeesStart: (state) => {
//       state.isLoading = true;
//       state.error = undefined;
//     },
//     loadEmployeeSuccess: (state, action: PayloadAction<Employee[]>) => {
//       state.isLoading = false;
//       state.data = action.payload;
//       state.error = undefined;
//     },
//     loadEmployeeError: (state, action: PayloadAction<string>) => {
//       state.isLoading = false;
//       state.data = [];
//       state.error = action.payload;
//     },
//     createEmployeeStart: (state) => {
//       state.createState.isLoading = true;
//     },
//     createEmployeeSuccess: (state, action: PayloadAction<Employee>) => {
//       state.createState.isLoading = false;
//       state.createState.error = undefined;
//       state.data.push(action.payload);
//     },
//     createEmployeeError: (state, action: PayloadAction<string>) => {
//       state.createState.isLoading = false;
//       state.createState.error = action.payload;
//     },
//   },
// });
// export const {
//   createEmployeeError,
//   createEmployeeStart,
//   createEmployeeSuccess,
//   loadEmployeeError,
//   loadEmployeeSuccess,
//   loadEmployeesStart,
// } = employeesSlice.actions;
// export default employeesSlice.reducer;
