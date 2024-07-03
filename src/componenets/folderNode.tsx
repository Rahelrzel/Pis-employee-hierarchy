"use client";

import { Box, Card, Collapse, Flex, NavLink, Text } from "@mantine/core";
import { useState } from "react";
import {
	IconChevronDown,
	IconChevronUp,
	IconUserCircle,
} from "@tabler/icons-react";
import { useGetAllEmployeesQuery } from "@/services/employeeApi";
import { EmployeeNode } from "@/types/employee";

export interface TreeNodeProps {
	node: EmployeeNode;
}

const TreeNode = ({ node }: TreeNodeProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const childrens = node.children.toSorted(
		(a, b) => a.children.length - b.children.length
	);

	return (
		<div className="my-2 p-2 w-full bg-gray-50">
			<NavLink
				active={isOpen}
				variant="subtle"
				color="green"
				onClick={toggleOpen}
				label={`${node.firstName} ${node.lastName}`}
				description={node.role.name}
				rightSection={
					node.children.length > 0 ? (
						isOpen ? (
							<IconChevronUp size={16} />
						) : (
							<IconChevronDown size={16} />
						)
					) : undefined
				}
			></NavLink>
			<Collapse in={isOpen} pl={"lg"}>
				{childrens.map((child) => (
					<TreeNode key={child.id} node={child} />
				))}
			</Collapse>
		</div>
	);
};

function TreeComponent() {
	const { data, isLoading, error } = useGetAllEmployeesQuery();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.toString()}</div>;

	return (
		<div>
			{data?.map((node) => (
				<TreeNode key={node.id} node={node} />
			))}
		</div>
	);
}

export default TreeComponent;
