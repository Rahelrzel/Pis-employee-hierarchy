// components/EmployeeTable.tsx

import React from "react";
import { Table, ScrollArea, Text } from "@mantine/core";

interface Employee {
  id: string;
  name: string;
  description: string;
  salary: string;
}

interface EmployeeTableProps {
  data: Employee[];
}

function EmployeeTable({ data }: EmployeeTableProps) {
  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Text size="sm" fw={500}>
          {item.name}
        </Text>
      </Table.Td>
      <Table.Td>{item.description}</Table.Td>
      <Table.Td>{item.salary}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Salary</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default EmployeeTable;
