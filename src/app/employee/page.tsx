"use client";
import React, { useEffect, useState } from "react";
import classes from "../../componenets/NavbarSimple.module.css";
import { Group, Flex, Text, Card, Input, Container } from "@mantine/core";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import RoleFilter from "../../componenets/roleFilter";
import AddStuffButton from "../../componenets/addStuffButton";
import EmployeeTable from "../../componenets/table";
import FormModal from "../../componenets/formModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
	loadEmployeeError,
	loadEmployeeSuccess,
	loadEmployeesStart,
} from "@/redux/features/employee-slice";
import { getEmployeesManagedByMe } from "@/services/employee";
import { AxiosError } from "axios";
import { Sidebar } from "@/componenets/Sidebar";

const roles = [
	"CEO",
	"CTO",
	"Project Manager",
	"Product Owner",
	"Tech Lead",
	"Frontend Developer",
	"Backend Developer",
	"DevOps Engineer",
	"QA Engineer",
	"Scrum Master",
	"CFO",
	"Chief Accountant",
	"Financial Analyst",
	"Account and Payable",
	"Internal Audit",
	"COO",
	"Product Manager",
	"Operation Manager",
	"Customer Relation",
	"HR",
];

const data = [
	{ link: "", label: "Home" },
	{ link: "", label: "Employees" },
	{ link: "", label: "Roles" },
];

const tableData = [
	{
		id: "1",
		name: "Robert Wolfkisser",
		description: "Engineer",
		salary: "$80,000",
	},
	{
		id: "2",
		name: "Jill Jailbreaker",
		description: "Engineer",
		salary: "$85,000",
	},
	{
		id: "3",
		name: "Henry Silkeater",
		description: "Designer",
		salary: "$90,000",
	},
	{
		id: "4",
		name: "Bill Horsefighter",
		description: "Designer",
		salary: "$95,000",
	},
	{
		id: "5",
		name: "Jeremy Footviewer",
		description: "Manager",
		salary: "$100,000",
	},
];

const fetchEmployeeDetails = (id: String) => {
	return new Promise((resolve) => {
		const employee = tableData.find((emp) => emp.id === id);
		setTimeout(() => resolve(employee), 1000); // Simulate network delay
	});
};

const CeoPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const authState = useSelector((state: RootState) => state.authReducer);
	const user = authState.user!;
	const employeeState = useSelector(
		(state: RootState) => state.employeeReducer
	);
	const [employees, setEmployees] = useState(tableData);
	const [keyword, setKeyword] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [filteredRole, setFilteredRole] = useState<string>("");
	const [active, setActive] = useState("Billing");

	useEffect(() => {
		const load = async () => {
			dispatch(loadEmployeesStart());
			try {
				const employees = await getEmployeesManagedByMe(
					authState.user!.token
				);
				dispatch(loadEmployeeSuccess(employees));
			} catch (error) {
				let msg = "Unable to load employees, try again";
				if (error instanceof AxiosError) {
					msg = error.response?.data["message"];
				}
				dispatch(loadEmployeeError(msg));
			}
		};
		load();
	}, [authState.user, dispatch]);

	const handleAddStuffClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleFormSubmit = (values: {
		name: string;
		description: string;
	}) => {
		const newEmployee = {
			id: (employees.length + 1).toString(),
			name: values.name,
			description: values.description,
			salary: "$0", // Default salary or adjust as needed
		};
		setEmployees((prevData) => [...prevData, newEmployee]);
		handleCloseModal();
	};

	const handleFilterChange = (selectedRole: string) => {
		setFilteredRole(selectedRole);
	};

	const handleRowClick = (id: string) => {
		router.push(`/employee/${id}`); // Navigate to the specific employee page
	};

	if (employeeState.isLoading) {
		return <>Loading...</>;
	}

	if (employeeState.error) {
		return <>{employeeState.error}</>;
	}

	let data = employeeState.data.filter((employee) =>
		employee.firstName.toLowerCase().startsWith(keyword.toLowerCase())
	);

	if (filteredRole) {
		data = data.filter((data) => data.role.id === filteredRole);
	}

	return (
		<main className={classes.main}>
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
				<Flex direction={"column"}>
					<Flex direction={"row"} gap={"md"} className="mb-5 mt-5">
						<Input
							classNames={{
								input: "border-black-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
							}}
							placeholder="Search"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<RoleFilter onFilterChange={handleFilterChange} />

						<AddStuffButton onClick={handleAddStuffClick} />
						<FormModal
							isOpen={isModalOpen}
							onClose={handleCloseModal}
							onSubmit={() => {}}
						/>
					</Flex>
					<EmployeeTable
						data={data}
						// onDelete={handleDelete}
						onRowClick={handleRowClick}
					/>
				</Flex>
			</Flex>
		</main>
	);
};

export default CeoPage;
