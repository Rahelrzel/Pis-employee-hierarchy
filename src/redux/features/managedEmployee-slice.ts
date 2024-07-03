// import { Employee } from "@/types/employee";
// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export interface EmployeeState {
//   isLoading: boolean;
//   error?: string;
//   data: Employee[];
// }

// const initialValue: EmployeeState = {
//   isLoading: false,
//   error: undefined,
//   data: [],
// };

// const managedEmployeeSlice = createSlice({
//   name: "managed-employees",
//   initialState: initialValue,
//   reducers: {
//     loadManagedEmployeesStart: (state) => {
//       state.isLoading = true;
//       state.error = undefined;
//     },
//     loadManagedEmployeeSuccess: (state, action: PayloadAction<Employee[]>) => {
//       state.isLoading = false;
//       state.data = action.payload;
//       state.error = undefined;
//     },
//     loadManagedEmployeeError: (state, action: PayloadAction<string>) => {
//       state.isLoading = false;
//       state.data = [];
//       state.error = action.payload;
//     },
//   },
// });
// export const {
//   loadManagedEmployeeError,
//   loadManagedEmployeeSuccess,
//   loadManagedEmployeesStart,
// } = managedEmployeeSlice.actions;
// export default managedEmployeeSlice.reducer;
