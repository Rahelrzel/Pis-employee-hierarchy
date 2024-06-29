import React from "react";
import { Table } from "@mantine/core";

interface Employee {
  id: string;
  name: string;
  description: string;
  salary: string;
}

interface EmployeeTableProps {
  data: Employee[];
  onRowClick: (id: string) => void;
}

const EmployeeTable = ({ data, onRowClick }: EmployeeTableProps) => {
  return (
    <Table
      className="m-5 border border-gray-300 rounded-lg overflow-hidden"
      striped
      highlightOnHover
    >
      <thead className="bg-gray-100 border-b border-gray-300">
        <tr>
          <th className="p-3 text-left">No</th>
          <th className="p-3 text-left">Name</th>
          <th className="p-3 text-left">Description</th>
          <th className="p-3 text-left">Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map((employee, index) => (
          <tr
            key={employee.id}
            onClick={() => onRowClick(employee.id)}
            className="cursor-pointer hover:bg-blue-50 border-b border-gray-200"
          >
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{employee.name}</td>
            <td className="p-3">{employee.description}</td>
            <td className="p-3">{employee.salary}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
