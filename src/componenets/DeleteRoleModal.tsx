import { useRoles } from "@/hooks/useRoles";

import { RootState } from "@/redux/store";
import { createRole, deleteRole } from "@/services/roles";
import { useDeleteRoleMutation } from "@/services/rolesApi";
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
  const [deleteRole, { isLoading, error }] = useDeleteRoleMutation();
  const handleDeleteRole = async () => {
    try {
      await deleteRole(id).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };
  return (
    <Modal opened={isOpen} onClose={onClose} title="Are you sure?">
      <Text>
        Deleting the role will also delete the employees assigned, please make
        sure you want to delete this role
      </Text>
      {error && (
        <Alert title="Unable to delete role" color="red">
          {(error as any).data?.message ?? "Unable to delete role"}
        </Alert>
      )}
      <Flex justify={"flex-end"} mt="lg" gap={"md"}>
        <Button
          className="self-end"
          color="red"
          onClick={handleDeleteRole}
          loading={isLoading}
        >
          Delete Role
        </Button>
        <Button variant="default" className="self-end" onClick={onClose}>
          Cancel
        </Button>
      </Flex>
    </Modal>
  );
};
