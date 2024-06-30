import React from "react";
import {
	ActionIcon,
	Alert,
	Anchor,
	Badge,
	Button,
	Chip,
	Menu,
	Table,
	rem,
} from "@mantine/core";
import { Employee } from "@/types/employee";
import dayjs from "dayjs";
import {
	IconDotsVertical,
	IconEdit,
	IconMenu,
	IconMenu2,
	IconTrash,
} from "@tabler/icons-react";

interface EmployeeTableProps {
	data: Employee[];
	onRowClick: (id: string) => void;
}

const EmployeeTable = ({ data, onRowClick }: EmployeeTableProps) => {
	if (data.length == 0) {
		return (
			<Alert title="0 employees found">
				There are no employees currently, add new employees or check
				back later.
			</Alert>
		);
	}

	return (
		<Table
			className="m-5 border border-gray-300 rounded-lg overflow-hidden"
			highlightOnHover
		>
			<Table.Thead className="bg-gray-100 border-b border-gray-300">
				<Table.Tr>
					<Table.Th className="p-3 text-left">No</Table.Th>
					<Table.Th className="p-3 text-left">Name</Table.Th>
					<Table.Th className="p-3 text-left">Email</Table.Th>
					<Table.Th className="p-3 text-left">Role</Table.Th>
					<Table.Th className="p-3 text-left">Description</Table.Th>
					<Table.Th className="p-3 text-left">Salary</Table.Th>
					<Table.Th className="p-3 text-left">Registered on</Table.Th>
					<Table.Th className="p-3 text-left">Actions</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{data.map((employee, index) => (
					<Table.Tr
						key={employee.id}
						className="cursor-pointer hover:bg-blue-50 border-b border-gray-200"
					>
						<Table.Td className="p-3">{index + 1}</Table.Td>
						<Table.Td
							className="p-3 cursor-pointer text-blue-800"
							onClick={() => onRowClick(employee.id)}
						>
							{employee.firstName + " " + employee.lastName}
						</Table.Td>
						<Table.Td className="p-3">
							<Anchor
								href={`mailto:${employee.email}`}
								variant="white"
								size="sm"
								target="_blank"
							>
								{employee.email}
							</Anchor>
						</Table.Td>
						<Table.Td className="p-3">
							<Badge variant="light" color="green">
								{employee.role.name}
							</Badge>
						</Table.Td>
						<Table.Td className="p-3">{employee.desc}</Table.Td>
						<Table.Td className="p-3">
							{employee.salary ? employee.salary + "ETB" : ""}
						</Table.Td>
						<Table.Td className="p-3">
							{dayjs(employee.createdAt).format("MMMM DD,YYYY")}
						</Table.Td>
						<Table.Td className="p-3">
							<Menu>
								<Menu.Target>
									<ActionIcon variant="default">
										<IconDotsVertical size={"20px"} />
									</ActionIcon>
								</Menu.Target>
								<Menu.Dropdown>
									<Menu.Item
										leftSection={
											<IconEdit
												style={{
													width: rem(14),
													height: rem(14),
												}}
											/>
										}
									>
										Edit Employee
									</Menu.Item>
									<Menu.Item
										color="red"
										leftSection={
											<IconTrash
												style={{
													width: rem(14),
													height: rem(14),
												}}
											/>
										}
									>
										Delete Employee
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</Table.Td>
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	);
};

export default EmployeeTable;
