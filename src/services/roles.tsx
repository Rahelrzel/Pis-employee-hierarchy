import { Role } from "@/types/employee";
import { apiWithToken } from "./api";

export const getRoles = async (token: string) => {
	const role = await apiWithToken(token)
		.get<Role[]>("/roles")
		.then((res) => res.data);
	return role;
};

export const createRole = async (token: string, role: string) => {
	const response = await apiWithToken(token)
		.post<Role>("/roles", {
			name: role,
		})
		.then((res) => res.data);
	return response;
};

export const deleteRole = async (token: string, id: string) => {
	const response = await apiWithToken(token)
		.delete(`/roles/${id}`)
		.then((res) => res.data);
	return response;
};
