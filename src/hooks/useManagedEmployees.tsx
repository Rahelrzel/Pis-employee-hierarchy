import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useGetManagedEmployeeQuery } from "@/services/managedEmployeeApi";

export const useRoles = () => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { data, error, isLoading } = useGetManagedEmployeeQuery(undefined, {
    skip: !user?.token,
  });

  return {
    employee: data,
    error,
    isLoading,
  };
};
