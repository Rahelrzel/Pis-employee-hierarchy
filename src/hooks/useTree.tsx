// slices/treeThunks.ts
import {
  loadTreeStart,
  loadTreeSuccess,
  loadTreeError,
} from "@/redux/features/tree-Slice";
import { RootState } from "@/redux/store";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TreeNode } from "@/types/tree";

export const useTreeData = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useSelector((state: RootState) => state.authReducer);
  const treeState = useSelector((state: RootState) => state.treeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      dispatch(loadTreeStart());
      try {
        const response = await axios.get<TreeNode[]>(user!.token);
        dispatch(loadTreeSuccess(response.data));
      } catch (error) {
        let message = "Unable to load tree data";
        if (error instanceof AxiosError) {
          message = error.response?.data.message || message;
        }
        dispatch(loadTreeError(message));
      }
    };

    if (treeState.data.length === 0 && !isLoaded) {
      setIsLoaded(true);
      load();
    }
  }, [dispatch, isLoaded, treeState.data]);

  return treeState;
};
