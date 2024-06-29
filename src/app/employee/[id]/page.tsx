"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Group, Flex, Text } from "@mantine/core";
import classes from "../NavbarSimple.module.css";
import { useParams } from "next/navigation";

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

type Employee = (typeof tableData)[number];

const fetchEmployeeDetails = async (id: string) => {
  return new Promise((resolve) => {
    const employee = tableData.find((emp) => emp.id === id);
    setTimeout(() => resolve(employee), 1000); // Simulate network delay
  });
};

const EmployeeDetailsPage = () => {
  const params = useParams();
  const id = params.id.toString();

  const [employee, setEmployee] = useState<(typeof tableData)[number]>();

  useEffect(() => {
    if (id) {
      fetchEmployeeDetails(id).then((data) =>
        setEmployee(data as (typeof tableData)[number])
      );
    }
  }, [id]);

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

  if (!employee) {
    return <div>Loading...</div>;
  }

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
          <div className="mb-4">
            <p className="text-3xl font-medium ">{employee.name}</p>
            <p className="text-2xl font-normal ">{employee.description}</p>
          </div>

          <Flex direction={"column"} gap={"sm"}>
            <p className="text-emerald-600 font-medium text-xl	">
              Employees Information
            </p>

            <Flex direction={"column"} gap={"md"}>
              <Flex direction={"row"} gap={"md"}>
                <p className=" font-medium text-md	">Name:</p>
                <p className=" font-normal text-md	">{employee.name}</p>
              </Flex>
              <Flex direction={"row"} gap={"md"}>
                <p className=" font-medium text-md	">Entry Date:</p>
                <p className=" font-normal text-md	">8/3/2024</p>
              </Flex>
              <Flex direction={"row"} gap={"md"}>
                <p className=" font-medium text-md	">Salary:</p>
                <p className=" font-normal text-md	">{employee.salary}</p>
              </Flex>
              <Flex direction={"row"} gap={"md"}>
                <p className=" font-medium text-md	">Description:</p>
                <p className=" font-normal text-md	">{employee.description}</p>
              </Flex>
            </Flex>
          </Flex>
        </main>
      </Flex>
    </>
  );
};

export default EmployeeDetailsPage;
