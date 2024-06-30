import { useRoles } from "@/hooks/useRoles";
import {
	createRoleError,
	createRoleStart,
	createRoleSuccess,
	deleteRoleError,
	deleteRoleStart,
	deleteRoleSuccess,
} from "@/redux/features/role-slice";
import { RootState } from "@/redux/store";
import { createRole, deleteRole } from "@/services/roles";
import { Alert, Button, Flex, Modal, Text, TextInput } from "@mantine/core";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ModalProps {
	id: string;
	isOpen: boolean;
	onClose: () => void;
}
export const DeleteRoleModal = ({ isOpen, onClose, id }: ModalProps) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.authReducer);
	const { deleteRole: deleteRoleState } = useRoles();

	const handleDeleteRole = async () => {
		dispatch(deleteRoleStart());
		try {
			const newRole = await deleteRole(user!.token, id);
			dispatch(deleteRoleSuccess(newRole));
			onClose();
		} catch (error) {
			let message = "unable to delete role";
			if (error instanceof AxiosError) {
				message = error.response?.data["message"];
			}
			dispatch(deleteRoleError(message));
		}
	};
	return (
		<Modal opened={isOpen} onClose={onClose} title="Are you sure?">
			<Text>
				Deleting the role will also delete the employees assigned,
				please make sure you want to delete this role
			</Text>
			{deleteRoleState.error && (
				<Alert title="Unable to delete role" color="red">
					{deleteRoleState.error}
				</Alert>
			)}
			<Flex justify={"flex-end"} mt="lg" gap={"md"}>
				<Button
					className="self-end"
					color="red"
					onClick={handleDeleteRole}
					loading={deleteRoleState.isLoading}
				>
					Delete Role
				</Button>
				<Button
					variant="default"
					className="self-end"
					onClick={onClose}
				>
					Cancel
				</Button>
			</Flex>
		</Modal>
	);
};
