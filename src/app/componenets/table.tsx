import React from "react";
import { Table, Button } from "@mantine/core";

interface Employee {
  id: string;
  name: string;
  description: string;
  salary: string;
}

interface EmployeeTableProps {
  data: Employee[];
  // onDelete: (id: string) => void;
  onRowClick: (id: string) => void; // Include onRowClick in props interface
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  // onDelete,
  onRowClick,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Description</th>
          <th>Salary</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {data.map((employee, index) => (
          <tr key={employee.id} onClick={() => onRowClick(employee.id)}>
            <td>{index + 1}</td>
            <td>{employee.name}</td>
            <td>{employee.description}</td>
            <td>{employee.salary}</td>
            <td>
              {/* <Button
                variant="outline"
                color="green"
                onClick={() => onDelete(employee.id)}
              >
                Delete
              </Button> */}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
