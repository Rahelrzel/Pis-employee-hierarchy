import {
	loadManagedEmployeeError,
	loadManagedEmployeeSuccess,
	loadManagedEmployeesStart,
} from "@/redux/features/managedEmployee-slice";
import { RootState } from "@/redux/store";
import { getEmployeesManagedByEmployee } from "@/services/employee";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useManagedEmployees = (id: string) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.authReducer);
	const employees = useSelector(
		(state: RootState) => state.managedEmployeeReducer
	);

	useEffect(() => {
		const load = async () => {
			dispatch(loadManagedEmployeesStart());
			try {
				const employees = await getEmployeesManagedByEmployee(
					user!.token,
					id
				);
				dispatch(loadManagedEmployeeSuccess(employees));
			} catch (error) {
				let msg = "Unable to load employees, try again";
				if (error instanceof AxiosError) {
					msg = error.response?.data["message"];
				}
				dispatch(loadManagedEmployeeError(msg));
			}
		};
		load();
	}, [dispatch, id, user]);

	return employees;
};
