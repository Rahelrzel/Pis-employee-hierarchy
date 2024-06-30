import { Employee } from "@/types/employee";
import { api, apiWithToken } from "./api";

export const getEmployeesManagedByMe = async (token: string) => {
	const response = await apiWithToken(token)
		.get<Employee[]>("/employee/manages")
		.then((res) => res.data);
	return response;
};

export const getEmployeesManagedByEmployee = async (
	token: string,
	id: string
) => {
	const response = await apiWithToken(token)
		.get<Employee[]>(`/employee/${id}/manages`)
		.then((res) => res.data);
	return response;
};

export const createEmployee = async (
	token: string,
	employee: Omit<Employee, "id" | "role" | "createdAt"> & { roleId: string }
) => {
	const response = await apiWithToken(token)
		.post<Employee>("/employee", employee)
		.then((res) => res.data);
	return response;
};
