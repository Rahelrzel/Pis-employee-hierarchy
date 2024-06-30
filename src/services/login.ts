import React from "react";
import { api } from "./api";

const loginUser = async (email: string, password: string) => {
	const response = await api.post("/employee/login", { email, password });
	return response.data;
};

const ApiServices = {
	loginUser,
};

export default ApiServices;
