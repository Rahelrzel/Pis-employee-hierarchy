import { Role } from "@/types/employee";
import { ActionState } from "@/types/state";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface RoleState {
	isLoading: boolean;
	error?: string;
	data: Role[];
	createRole: ActionState;
	deleteRole: ActionState;
}

export const initialState: RoleState = {
	isLoading: false,
	error: undefined,
	data: [],
	createRole: {
		isLoading: false,
		error: undefined,
	},
	deleteRole: {
		isLoading: false,
		error: undefined,
	},
};

const roleSlice = createSlice({
	name: "role",
	initialState,
	reducers: {
		loadRolesStart: (state) => {
			state.isLoading = true;
			state.error = undefined;
		},
		loadRoleSuccess: (state, action: PayloadAction<Role[]>) => {
			state.isLoading = false;
			state.data = action.payload;
		},
		loadRoleError: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
			state.error = action.payload;
		},
	},
});

export const { loadRoleError, loadRoleSuccess, loadRolesStart } =
	roleSlice.actions;

export default roleSlice.reducer;
