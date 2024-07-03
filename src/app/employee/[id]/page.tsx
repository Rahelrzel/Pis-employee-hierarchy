"use client";
import React, { useEffect, useState } from "react";
import { Group, Flex, Text, Table, Anchor, Loader, Alert } from "@mantine/core";
import classes from "../../../componenets/NavbarSimple.module.css";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";
import EmployeeTable from "@/componenets/table";
import { IconInfoCircle } from "@tabler/icons-react";
import { useGetManagedEmployeeQuery } from "@/services/managedEmployeeApi";
import { useGetEmployeeQuery } from "@/services/employeeApi";

const EmployeeDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { data: employees } = useGetEmployeeQuery();
  const id = params.id.toString();
  const employee = employee.find((employee) => employee.id === id);
  const { data, error, isLoading } = useGetManagedEmployeeQuery(id);

  if (!employee) {
    return <>Employee not found</>;
  }

  return (
    <main className={"w-full flex-1 p-10"}>
      <div className="mb-4">
        <p className="text-3xl font-medium ">
          {employee.firstName + " " + employee.lastName}
        </p>
        <p className="text-2xl font-normal ">{employee.desc}</p>
      </div>

      <Flex direction={"column"} gap={"sm"}>
        <p className="text-emerald-600 font-medium text-xl	">
          Employees Information
        </p>

        <Flex direction={"column"} gap={"md"}>
          <Table className="w-1/2" withTableBorder>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Td>
                {employee.firstName + " " + employee.lastName}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Email</Table.Th>
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
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Entry Date</Table.Th>
              <Table.Td>
                {dayjs(employee.createdAt).format("MMMM DD, YYYY")}
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Salary</Table.Th>
              <Table.Td>{employee.salary}</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th>Description</Table.Th>
              <Table.Td>{employee.desc}</Table.Td>
            </Table.Tr>
          </Table>
        </Flex>
      </Flex>
      <p className="text-emerald-600 font-medium text-xl	pt-10 pb-2">
        Employees Managed
      </p>
      {isLoading ? (
        <Loader color="green" />
      ) : (
        data && (
          <EmployeeTable
            data={data}
            onRowClick={(id) => {
              router.push(`/employee/${id}`);
            }}
          />
        )
      )}
      {error && (
        <Alert
          title="Unable to load managed employees"
          color="red"
          icon={<IconInfoCircle />}
        >
          {error}
        </Alert>
      )}
    </main>
  );
};

export default EmployeeDetailsPage;
