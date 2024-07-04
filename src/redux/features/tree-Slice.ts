// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { TreeNode } from "@/types/tree";

// interface TreeState {
//   isLoading: boolean;
//   error?: string;
//   data: TreeNode[];
// }

// const initialState: TreeState = {
//   isLoading: false,
//   error: undefined,
//   data: [],
// };

// const treeSlice = createSlice({
//   name: "tree",
//   initialState,
//   reducers: {
//     loadTreeStart: (state) => {
//       state.isLoading = true;
//       state.error = undefined;
//     },
//     loadTreeSuccess: (state, action: PayloadAction<TreeNode[]>) => {
//       state.isLoading = false;
//       state.data = action.payload;
//       state.error = undefined;
//     },
//     loadTreeError: (state, action: PayloadAction<string>) => {
//       state.isLoading = false;
//       state.data = [];
//       state.error = action.payload;
//     },
//   },
// });

// export const { loadTreeStart, loadTreeSuccess, loadTreeError } =
//   treeSlice.actions;
// export default treeSlice.reducer;
