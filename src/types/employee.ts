export interface Employee {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;
	createdAt: string;
	desc?: string;
	salary?: number;
}

export interface Role {
	id: string;
	name: string;
	count?: number;
}

export interface EmployeeNode extends Employee {
	children: EmployeeNode[];
}
