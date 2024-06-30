"use client";
import React, { useState } from "react";
import classes from "../../componenets/NavbarSimple.module.css";
import { Flex, Card, Input, Button, Loader, Alert } from "@mantine/core";
import { useRouter } from "next/navigation";
import RoleFilter from "../../componenets/roleFilter";
import EmployeeTable from "../../componenets/table";
import FormModal from "../../componenets/formModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEmployees } from "@/hooks/useEmployees";

const CeoPage = () => {
	const router = useRouter();
	const authState = useSelector((state: RootState) => state.authReducer);
	const user = authState.user!;
	const employeeState = useEmployees();
	const [keyword, setKeyword] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [filteredRole, setFilteredRole] = useState<string>("");

	const handleAddStuffClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleFilterChange = (selectedRole: string) => {
		setFilteredRole(selectedRole);
	};

	const handleRowClick = (id: string) => {
		router.push(`/employee/${id}`); // Navigate to the specific employee page
	};

	if (employeeState.isLoading) {
		return (
			<Flex direction={"column"} p="lg" className="w-full h-full">
				<Card>
					<Loader color="green" mb="lg" />
					Loading...
				</Card>
			</Flex>
		);
	}

	if (employeeState.error) {
		return (
			<Flex p={"lg"} className="w-full h-full">
				<Alert></Alert>
				{employeeState.error}
			</Flex>
		);
	}

	let data = employeeState.data.filter((employee) =>
		employee.firstName.toLowerCase().startsWith(keyword.toLowerCase())
	);

	if (filteredRole) {
		data = data.filter((data) => data.role.id === filteredRole);
	}

	return (
		<main className={"flex-1 p-10"}>
			<Flex direction={"column"} gap={"xl"}>
				<p className="text-4xl font-medium #16a34a text-emerald-600">
					Welcome {user.firstName + " " + user.lastName},
				</p>
				<Flex direction={"row"} gap={"md"}>
					<Flex
						justify="center"
						align="center"
						direction="column"
						className={classes.mainContent}
					>
						<Card bg={"green"}>
							<p className="text-white font-medium text-xl">
								Total Employees
							</p>
							<p className="text-white font-medium text-2xl">
								21
							</p>
						</Card>
					</Flex>
					<Flex
						justify="center"
						align="center"
						direction="column"
						className={classes.mainContent}
					>
						<Card className="border-solid border-green-700">
							<p className="text-emerald-600 font-medium text-xl">
								Employees Directly Managed
							</p>
							<p className="text-emerald-600 font-medium text-2xl">
								{employeeState.data.length}
							</p>
						</Card>
					</Flex>
				</Flex>
				<Flex direction={"column"} className="w-full">
					<Flex
						direction={"row"}
						gap={"md"}
						className="mb-5 mt-5 w-full"
					>
						<Input
							classNames={{
								input: "border-black-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
							}}
							placeholder="Search"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<RoleFilter onFilterChange={handleFilterChange} />
						<div className="flex-1"></div>
						<Button color="green" onClick={handleAddStuffClick}>
							Add Stuff
						</Button>
						<FormModal
							isOpen={isModalOpen}
							onClose={handleCloseModal}
						/>
					</Flex>
					<EmployeeTable data={data} onRowClick={handleRowClick} />
				</Flex>
			</Flex>
		</main>
	);
};

export default CeoPage;
