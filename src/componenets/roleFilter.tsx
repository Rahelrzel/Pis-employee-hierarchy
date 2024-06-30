import React, { useEffect, useState } from "react";
import { Flex, Loader, Select } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
	loadRoleError,
	loadRoleSuccess,
	loadRolesStart,
} from "@/redux/features/role-slice";
import { getRoles } from "@/services/roles";
import { AxiosError } from "axios";

interface RoleFilterProps {
	onFilterChange: (selectedRole: string) => void;
}

function RoleFilter({ onFilterChange }: RoleFilterProps) {
	const {
		data: roles,
		isLoading,
		error,
	} = useSelector((state: RootState) => state.roleReducer);
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.authReducer);
	const [selectedRole, setSelectedRole] = useState<string | null>(null);

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
		load();
	}, [dispatch, user]);

	const handleChange = (value: string | null) => {
		setSelectedRole(value);
		if (value) {
			onFilterChange(value);
		} else {
			onFilterChange("");
		}
	};

	return (
		<Flex align={"center"} direction={"row"}>
			{isLoading && <Loader size={"sm"} />}
			<Select
				disabled={isLoading}
				placeholder="Filter by role"
				data={roles.map((role) => ({
					value: role.id,
					label: role.name,
				}))}
				value={selectedRole}
				onChange={handleChange}
				clearable
			/>
		</Flex>
	);
}

export default RoleFilter;
