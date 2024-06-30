import { useRoles } from "@/hooks/useRoles";
import {
	createRoleError,
	createRoleStart,
	createRoleSuccess,
} from "@/redux/features/role-slice";
import { RootState } from "@/redux/store";
import { createRole } from "@/services/roles";
import { Alert, Button, Flex, Modal, TextInput } from "@mantine/core";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}
export const AddRoleModal = ({ isOpen, onClose }: ModalProps) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.authReducer);
	const { createRole: createRoleState } = useRoles();
	const [role, setRole] = useState("");
	const handleCreateRole = async () => {
		dispatch(createRoleStart());
		try {
			const newRole = await createRole(user!.token, role);
			dispatch(createRoleSuccess(newRole));
			setRole("");
			onClose();
		} catch (error) {
			let message = "unable to create role";
			if (error instanceof AxiosError) {
				message = error.response?.data["message"];
			}
			dispatch(createRoleError(message));
		}
	};
	return (
		<Modal opened={isOpen} onClose={onClose} title="Add New Role">
			<TextInput
				label="Role"
				color="green"
				value={role}
				onChange={(e) => setRole(e.target.value)}
				disabled={createRoleState.isLoading}
			/>
			{createRoleState.error && (
				<Alert title="Unable to delete role" color="red" my="md">
					{createRoleState.error}
				</Alert>
			)}
			<Flex justify={"flex-end"} mt="lg">
				<Button
					className="self-end"
					color="green"
					onClick={handleCreateRole}
					loading={createRoleState.isLoading}
				>
					Create Role
				</Button>
			</Flex>
		</Modal>
	);
};
