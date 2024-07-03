import React from "react";
import {
  Modal,
  TextInput,
  Button,
  Flex,
  Textarea,
  Select,
  Loader,
  Alert,
} from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { RootState } from "@/redux/store";
import { AxiosError } from "axios";
import { IconInfoCircle } from "@tabler/icons-react";
import { useGetEmployeeQuery } from "@/services/employeeApi";
import { useCreateEmployeeMutation } from "@/services/employeeApi";
import { useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useGetRolesQuery } from "@/services/rolesApi";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  salary: z.number(),
  desc: z.string().optional(),
  roleId: z.string().refine((val) => val !== "", { message: "Select a role" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose }) => {
  const {
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const {
    data: roles,
    error: rolesError,
    isLoading: rolesLoading,
  } = useGetRolesQuery();
  const {
    data: employees,
    error: employeesError,
    isLoading: employeesLoading,
  } = useGetEmployeeQuery();
  const [createEmployee, { isLoading: createLoading }] =
    useCreateEmployeeMutation();

  const authState = useSelector((state: RootState) => state.authReducer);
  const user = authState.user!;

  const handleFormSubmit: SubmitHandler<FormSchemaType> = async (values) => {
    try {
      const newEmployee = await createEmployee({
        ...values,
      });

      reset();
      onClose();

      if (newEmployee.error) {
        console.error("Error creating employee:", newEmployee.error);
      }
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Add New Staff">
      {employeesError && (
        <Alert
          mb={"md"}
          title="Unable to create employee"
          color="red"
          icon={<IconInfoCircle />}
        >
          {employeesError.toString()}
        </Alert>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Flex direction={"column"} gap={"md"}>
          <TextInput
            required
            label="First Name"
            placeholder="Enter Employee First name"
            {...register("firstName")}
            error={errors.firstName?.message}
            disabled={createLoading}
          />
          <TextInput
            required
            label="Last Name"
            placeholder="Enter Employee Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
            disabled={createLoading}
          />
          <TextInput
            required
            label="Email"
            placeholder="Enter Employee Email"
            {...register("email")}
            error={errors.email?.message}
            disabled={createLoading}
          />
          <TextInput
            required
            label="Password"
            placeholder="Enter Employee Password"
            {...register("password")}
            error={errors.password?.message}
            disabled={createLoading}
          />
          <Flex gap={"sm"}>
            <TextInput
              required
              label="Salary"
              placeholder="Enter Employee Salary"
              type="number"
              {...register("salary", {
                setValueAs: (value) => Number(value),
              })}
              error={errors.salary?.message}
              disabled={createLoading}
            />
            {roles && (
              <Select
                required
                label="Role"
                placeholder="Select Employee Role"
                data={roles.map((role) => ({
                  value: role.id,
                  label: role.name,
                }))}
                leftSection={rolesLoading && <Loader size={"sm"} />}
                {...(register("roleId") as any)}
                onChange={(value) => {
                  if (value) {
                    setValue("roleId", value);
                  }
                }}
                disabled={rolesLoading || createLoading}
              />
            )}
          </Flex>
          <Textarea
            label="Description"
            placeholder="Enter Employee Description"
            {...register("desc")}
            error={errors.desc?.message}
            disabled={createLoading}
          />
          <Flex gap={"md"} className={"w-full"} justify="flex-end">
            <Button
              color="gray"
              variant="subtle"
              type="button"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button color="green" type="submit" loading={createLoading}>
              Create Employee
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

export default FormModal;
