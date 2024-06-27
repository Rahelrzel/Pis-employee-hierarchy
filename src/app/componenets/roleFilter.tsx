import React, { useState } from "react";
import { Select } from "@mantine/core";

interface RoleFilterProps {
  roles: string[];
  onFilterChange: (selectedRole: string) => void;
}

function RoleFilter({ roles, onFilterChange }: RoleFilterProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleChange = (value: string | null) => {
    setSelectedRole(value);
    if (value) {
      onFilterChange(value);
    } else {
      onFilterChange("");
    }
  };

  return (
    <Select
      placeholder="Filter by role"
      data={roles.map((role) => ({ value: role, label: role }))}
      value={selectedRole}
      onChange={handleChange}
      clearable
    />
  );
}

export default RoleFilter;
