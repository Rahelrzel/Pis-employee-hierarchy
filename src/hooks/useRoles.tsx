import { useGetRolesQuery } from "@/services/rolesApi";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useRoles = () => {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const { data, error, isLoading } = useGetRolesQuery(undefined, {
    skip: !user?.token,
  });

  return {
    roles: data,
    error,
    isLoading,
  };
};
