import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useGetEmployeeQuery } from "@/services/employeeApi";

export const useRoles = () => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { data, error, isLoading } = useGetEmployeeQuery(undefined, {
    skip: !user?.token,
  });

  return {
    employee: data,
    error,
    isLoading,
  };
};
