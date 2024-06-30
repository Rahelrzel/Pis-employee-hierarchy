"use client";

import { AddRoleModal } from "@/componenets/AddRoleModal";
import { DeleteRoleModal } from "@/componenets/DeleteRoleModal";
import { useRoles } from "@/hooks/useRoles";
import {
	ActionIcon,
	Badge,
	Button,
	Card,
	Flex,
	Menu,
	Table,
	Text,
	Title,
	rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function RolesPage() {
	const [selectedId, setSelectedId] = useState("");
	const [opened, { open, close }] = useDisclosure(false);
	const [deleteOpened, { open: deleteOpen, close: deleteClose }] =
		useDisclosure(false);
	const { data: roles } = useRoles();
	return (
		<Flex direction={"column"} className="p-10 flex-1">
			<Title className="text-green-500" order={1}>
				Roles
			</Title>
			<Text>From here you can manage roles.</Text>

			<Flex mt="lg">
				<Card shadow="lg" bg={"green"} c={"white"}>
					<Title size={"xl"} order={3}>
						Total Roles
					</Title>
					<Title>{roles.length}</Title>
				</Card>
			</Flex>
			<Button className="self-end mt-10" color="green" onClick={open}>
				Add Role
			</Button>
			<AddRoleModal isOpen={opened} onClose={close} />
			<DeleteRoleModal
				isOpen={deleteOpened}
				onClose={deleteClose}
				id={selectedId}
			/>
			<Table className="w-full mt-2" withTableBorder>
				<Table.Thead>
					<Table.Th>No.</Table.Th>
					<Table.Th>Role</Table.Th>
					<Table.Th>Employees</Table.Th>
					<Table.Th>Actions</Table.Th>
				</Table.Thead>
				<Table.Tbody>
					{roles.map((role, index) => (
						<Table.Tr key={role.id}>
							<Table.Td>{index + 1}</Table.Td>
							<Table.Td>
								<Badge variant="light" color="green">
									{role.name}
								</Badge>
							</Table.Td>
							<Table.Td>{role.count ?? 0}</Table.Td>
							<Table.Td>
								<Menu>
									<Menu.Target>
										<ActionIcon
											variant="light"
											color="gray"
										>
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
											Edit Role
										</Menu.Item>
										<Menu.Item
											onClick={() => {
												setSelectedId(role.id);
												deleteOpen();
											}}
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
											Delete Role
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Table.Td>
						</Table.Tr>
					))}
				</Table.Tbody>
			</Table>
		</Flex>
	);
}
