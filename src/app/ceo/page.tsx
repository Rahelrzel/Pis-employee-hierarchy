"use client";
import React, { useState } from "react";
import classes from "./NavbarSimple.module.css";
import {
  Group,
  Code,
  Flex,
  Text,
  Card,
  Input,
  Button,
  Container,
} from "@mantine/core";
import RoleFilter from "../componenets/roleFilter";
import AddStuffButton from "../componenets/addStuffButton";
import FormModal from "../componenets/formModal";
import EmployeeTable from "../componenets/table";
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
const CeoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStuffClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (values: { name: string; description: string }) => {
    console.log("Form submitted:", values);
    handleCloseModal();
  };
  const [filteredRole, setFilteredRole] = useState<string>("");

  const handleFilterChange = (selectedRole: string) => {
    setFilteredRole(selectedRole);
  };

  const filteredRoles = filteredRole
    ? roles.filter((role) => role.includes(filteredRole))
    : roles;

  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));
  return (
    <>
      <Flex style={{ minHeight: "100vh" }}>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>
            <Group className={classes.header} justify="space-between">
              <div>
                <Text
                  component="div"
                  variant="gradient"
                  gradient={{ from: "green", to: "cyan" }}
                  className={classes.gradientText}
                >
                  Perago
                </Text>
                <Text component="div" className={classes.gradientText}>
                  Information
                </Text>
                <Text component="div" className={classes.gradientText}>
                  System
                </Text>
              </div>
            </Group>
            {links}
          </div>

          <div className={classes.footer}>
            <a
              href="#"
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <span>Logout</span>
            </a>
          </div>
        </nav>
        <main className={classes.main}>
          <Flex direction={"column"} gap={"xl"}>
            <p className="text-4xl font-medium #16a34a text-emerald-600">
              Welcome, NAOL!
            </p>
            <Flex direction={"row"} gap={"md"}>
              <Flex
                justify="center"
                align="center"
                direction="column"
                className={classes.mainContent}
              >
                <Card bg={"green"}>
                  <p className="text-white font-medium text-xl	">
                    Total Employees
                  </p>
                  <p className="text-white font-medium text-2xl">21</p>
                </Card>
              </Flex>
              <Flex
                justify="center"
                align="center"
                direction="column"
                className={classes.mainContent}
              >
                <Card className="border-solid border-green-700">
                  <p className="text-emerald-600 font-medium text-xl	">
                    Employees Directly Managed
                  </p>
                  <p className="text-emerald-600 font-medium text-2xl	">4</p>
                </Card>
              </Flex>
            </Flex>
            <Flex direction={"row"} gap={"md"}>
              {" "}
              <Input placeholder="Input component" />
              <RoleFilter roles={roles} onFilterChange={handleFilterChange} />
              <Container>
                <AddStuffButton onClick={handleAddStuffClick} />
                <FormModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onSubmit={handleFormSubmit}
                />
              </Container>
            </Flex>
            <EmployeeTable data={tableData} />
          </Flex>
        </main>
      </Flex>
    </>
  );
};

export default CeoPage;
