import React from "react";
import {
	Modal,
	TextInput,
	Button,
	Group,
	Flex,
	Textarea,
	Select,
	Loader,
	Alert,
} from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useRoles } from "@/hooks/useRoles";
import { useDispatch, useSelector } from "react-redux";
import {
	createEmployeeError,
	createEmployeeStart,
	createEmployeeSuccess,
} from "@/redux/features/employee-slice";
import { createEmployee } from "@/services/employee";
import { RootState } from "@/redux/store";
import { AxiosError } from "axios";
import { IconInfoCircle } from "@tabler/icons-react";

const formSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	salary: z.number(),
	desc: z.string().optional(),
	roleId: z.string({ message: "Select role" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface FormModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const FormModal = ({ isOpen, onClose }: FormModalProps) => {
	const {
		setValue,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
	});
	const dispatch = useDispatch();
	const rolesState = useRoles();
	const { user } = useSelector((state: RootState) => state.authReducer);
	const { createState } = useSelector(
		(state: RootState) => state.employeeReducer
	);

	const handleFormSubmit: SubmitHandler<FormSchemaType> = async (values) => {
		dispatch(createEmployeeStart());
		try {
			const newEmployee = await createEmployee(user!.token, values);
			dispatch(createEmployeeSuccess(newEmployee));
			reset();
			onClose();
		} catch (error) {
			let message = "unable to create roles";
			if (error instanceof AxiosError) {
				message = error.response?.data["message"];
			}
			dispatch(createEmployeeError(message));
		}
	};

	return (
		<Modal opened={isOpen} onClose={onClose} title="Add New Stuff">
			{createState.error && (
				<Alert
					mb={"md"}
					title="Unable to create employee"
					color="red"
					icon={<IconInfoCircle />}
				>
					{createState.error}
				</Alert>
			)}
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<Flex direction={"column"} gap={"md"}>
					<Flex gap={"sm"}>
						<TextInput
							required
							label="First Name"
							placeholder="Enter Employee First name"
							{...register("firstName")}
							error={errors.firstName?.message}
							disabled={createState.isLoading}
						/>
						<TextInput
							required
							label="Last Name"
							placeholder="Enter Employee Last Name"
							{...register("lastName")}
							error={errors.lastName?.message}
							disabled={createState.isLoading}
						/>
					</Flex>
					<TextInput
						required
						label="Email"
						placeholder="Enter Employee Email"
						{...register("email")}
						error={errors.email?.message}
						disabled={createState.isLoading}
					/>
					<TextInput
						required
						label="Password"
						placeholder="Enter Employee Password"
						{...register("password")}
						error={errors.password?.message}
						disabled={createState.isLoading}
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
							disabled={createState.isLoading}
						/>
						{rolesState.data && (
							<Select
								required
								label="Role"
								placeholder="Select Employee Role"
								data={rolesState.data.map((role) => ({
									value: role.id,
									label: role.name,
								}))}
								leftSection={
									rolesState.isLoading && (
										<Loader size={"sm"} />
									)
								}
								{...(register("roleId") as any)}
								onChange={(value) => {
									if (value) {
										setValue("roleId", value);
									}
								}}
								disabled={
									rolesState.isLoading ||
									createState.isLoading
								}
							/>
						)}
					</Flex>
					<Textarea
						label="Description"
						placeholder="Enter Employee Desc"
						{...register("desc")}
						error={errors.desc?.message}
						disabled={createState.isLoading}
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
						<Button
							color="green"
							type="submit"
							loading={createState.isLoading}
						>
							Create Employee
						</Button>
					</Flex>
				</Flex>
			</form>
		</Modal>
	);
};

export default FormModal;
