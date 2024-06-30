import {
	loadRoleError,
	loadRoleSuccess,
	loadRolesStart,
} from "@/redux/features/role-slice";
import { RootState } from "@/redux/store";
import { getRoles } from "@/services/roles";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useRoles = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const { user } = useSelector((state: RootState) => state.authReducer);
	const roleState = useSelector((state: RootState) => state.roleReducer);
	const dispatch = useDispatch();

	useEffect(() => {
		const load = async () => {
			dispatch(loadRolesStart());
			try {
				const roles = await getRoles(user!.token);
				dispatch(loadRoleSuccess(roles));
			} catch (error) {
				let message = "unable to load roles";
				if (error instanceof AxiosError) {
					message = error.response?.data["message"];
				}
				dispatch(loadRoleError(message));
			}
		};

		if (roleState.data.length == 0 && !isLoaded) {
			setIsLoaded(true);
			load();
		}
	}, [dispatch, isLoaded, roleState.data, user]);

	return roleState;
};
