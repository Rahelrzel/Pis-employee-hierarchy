import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Role } from "@/types/employee";
import { RootState } from "@/redux/store";

export const rolesApi = createApi({
  reducerPath: "rolesApi",
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
  tagTypes: ["Roles"],
  endpoints: (builder) => ({
    getRoles: builder.query<Role[], void>({
      query: () => "/roles",
      providesTags: ["Roles"],
    }),
    createRole: builder.mutation<Role, Partial<Role>>({
      query: (newRole) => ({
        url: "/roles",
        method: "POST",
        body: newRole,
      }),
      invalidatesTags: ["Roles"],
    }),
    deleteRole: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),
  }),
});

export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
} = rolesApi;
