import { RootState } from "@/redux/store";
import { Employee } from "@/types/employee";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const managedEmployeeApi = createApi({
  reducerPath: "managedEmployeeApii",
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
  tagTypes: ["ManagedEmployee"],
  endpoints: (builder) => ({
    getManagedEmployee: builder.query<Employee[], string>({
      query: (id) => `/employee/${id}/managed`,
      providesTags: ["ManagedEmployee"],
    }),
  }),
});

export const { useGetManagedEmployeeQuery } = managedEmployeeApi;
