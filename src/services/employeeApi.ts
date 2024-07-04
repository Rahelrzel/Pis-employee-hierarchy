import { RootState } from "@/redux/store";
import { Employee, EmployeeNode } from "@/types/employee";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "EmployeeApii",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pis-employee-backend.onrender.com/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authReducer.user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getAllEmployees: builder.query<EmployeeNode[], void>({
      query: () => `/employee`,
      providesTags: ["Employee"],
    }),
    getEmployee: builder.query<Employee[], void>({
      query: () => `/employee/manages`,
      providesTags: ["Employee"],
    }),
    createEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (newEmployee) => ({
        url: `/employe`,
        method: "POST",
        body: newEmployee,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
} = employeeApi;
