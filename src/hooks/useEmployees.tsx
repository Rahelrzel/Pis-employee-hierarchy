import {
	loadEmployeeError,
	loadEmployeeSuccess,
	loadEmployeesStart,
} from "@/redux/features/employee-slice";
import { RootState } from "@/redux/store";
import { getEmployeesManagedByMe } from "@/services/employee";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useEmployees = () => {
	const dispatch = useDispatch();
	const [hasLoaded, setHasLoaded] = useState(false);
	const { user } = useSelector((state: RootState) => state.authReducer);
	const employeeState = useSelector(
		(state: RootState) => state.employeeReducer
	);

	useEffect(() => {
		const load = async () => {
			dispatch(loadEmployeesStart());
			try {
				const employees = await getEmployeesManagedByMe(user!.token);
				dispatch(loadEmployeeSuccess(employees));
			} catch (error) {
				let msg = "Unable to load employees, try again";
				if (error instanceof AxiosError) {
					msg = error.response?.data["message"];
				}
				dispatch(loadEmployeeError(msg));
			}
		};
		if (employeeState.data.length === 0 && !hasLoaded) {
			setHasLoaded(true);
			load();
		}
	}, [dispatch, employeeState.data.length, hasLoaded, user]);

	return employeeState;
};
