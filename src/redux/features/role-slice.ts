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
		createRoleStart: (state) => {
			state.createRole.isLoading = true;
			state.createRole.error = undefined;
		},
		createRoleSuccess: (state, action: PayloadAction<Role>) => {
			state.createRole.isLoading = false;
			state.data.push(action.payload);
		},
		createRoleError: (state, action: PayloadAction<string>) => {
			state.createRole.isLoading = false;
			state.createRole.error = action.payload;
		},
		deleteRoleStart: (state) => {
			state.deleteRole.isLoading = true;
			state.deleteRole.error = undefined;
		},
		deleteRoleSuccess: (state, action: PayloadAction<Role>) => {
			state.deleteRole.isLoading = false;
			state.data = state.data.filter(
				(role) => role.id !== action.payload.id
			);
		},
		deleteRoleError: (state, action: PayloadAction<string>) => {
			state.deleteRole.isLoading = false;
			state.deleteRole.error = action.payload;
		},
	},
});

export const {
	loadRoleError,
	loadRoleSuccess,
	loadRolesStart,
	createRoleError,
	createRoleStart,
	createRoleSuccess,
	deleteRoleError,
	deleteRoleStart,
	deleteRoleSuccess,
} = roleSlice.actions;

export default roleSlice.reducer;
