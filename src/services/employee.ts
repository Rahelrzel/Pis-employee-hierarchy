import { Employee } from "@/types/employee";
import { api, apiWithToken } from "./api";

export const getEmployeesManagedByMe = async (token: string) => {
	const response = await apiWithToken(token)
		.get<Employee[]>("/employee/manages")
		.then((res) => res.data);
	return response;
};
