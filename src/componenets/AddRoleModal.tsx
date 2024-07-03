import { useCreateRoleMutation } from "@/services/rolesApi";
import { useRoles } from "@/hooks/useRoles"; // Ensure this path is correct
import { RootState } from "@/redux/store";
import { Alert, Button, Flex, Modal, TextInput } from "@mantine/core";
import { useState } from "react";
import { useSelector } from "react-redux";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddRoleModal = ({ isOpen, onClose }: ModalProps) => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const [role, setRole] = useState("");
  const { roles, error: rolesError, isLoading: rolesLoading } = useRoles();
  const [createRole, { isLoading, error }] = useCreateRoleMutation();

  const handleCreateRole = async () => {
    try {
      await createRole({ name: role }).unwrap();
      setRole("");
      onClose();
    } catch (error) {
      console.error("Failed to create role:", error);
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add New Role">
      <TextInput
        label="Role"
        color="green"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        disabled={isLoading}
      />
      {error && (
        <Alert title="Unable to create role" color="red" my="md">
          {(error as any).data?.message ?? "Unable to create role"}
        </Alert>
      )}
      <Flex justify={"flex-end"} mt="lg">
        <Button
          className="self-end"
          color="green"
          onClick={handleCreateRole}
          loading={isLoading}
        >
          Create Role
        </Button>
      </Flex>
    </Modal>
  );
};
