import { Role } from "@/types/employee";
import { apiWithToken } from "./api";

export const getRoles = async (token: string) => {
	const role = await apiWithToken(token)
		.get<Role[]>("/roles")
		.then((res) => res.data);
	return role;
};
