import axios from "axios";

export const api = axios.create({
	baseURL: "https://pis-employee-backend.onrender.com/api/v1",
});

export const apiWithToken = (token: string) => {
	return axios.create({
		baseURL: "https://pis-employee-backend.onrender.com/api/v1",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
