import React, { useEffect, useState } from "react";
import { Flex, Loader, Select } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  loadRoleError,
  loadRoleSuccess,
  loadRolesStart,
} from "@/redux/features/role-slice";
import { getRoles } from "@/services/roles";
import { AxiosError } from "axios";

import { useGetRolesQuery } from "@/services/rolesApi";

interface RoleFilterProps {
  onFilterChange: (selectedRole: string) => void;
}

function RoleFilter({ onFilterChange }: RoleFilterProps) {
  const { data: roles, isLoading, error } = useGetRolesQuery();
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
    <Flex align={"center"} direction={"row"}>
      {isLoading && <Loader size={"sm"} />}
      <Select
        disabled={isLoading}
        placeholder="Filter by role"
        data={roles?.map((role) => ({
          value: role.id,
          label: role.name,
        }))}
        value={selectedRole}
        onChange={handleChange}
        clearable
      />
    </Flex>
  );
}

export default RoleFilter;
