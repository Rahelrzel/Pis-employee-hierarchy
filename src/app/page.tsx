"use client";

import {
	Alert,
	Button,
	Card,
	Flex,
	Group,
	PasswordInput,
	Text,
	TextInput,
} from "@mantine/core";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useDispatch, useSelector } from "react-redux";
import {
	loginFail,
	loginStart,
	loginSuccess,
	User,
} from "@/redux/features/auth-slice";
import ApiServices from "../services/login";
import { AxiosError } from "axios";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const schema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email("Invalid email address"),
	password: z
		.string()
		.min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const LoginPage = () => {
	const router = useRouter();
	const authState = useSelector((state: RootState) => state.authReducer);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = async (data: FormData) => {
		try {
			dispatch(loginStart());
			const userData = await ApiServices.loginUser(
				data.email,
				data.password
			);
			dispatch(loginSuccess(userData));
			router.push(`/employee`);
		} catch (err) {
			let msg = "Login failed";
			if (err instanceof AxiosError) {
				msg = err.response?.data?.message;
			}
			dispatch(loginFail(msg));
		}
	};

	return (
		<Flex
			justify="center"
			align="center"
			style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}
		>
			<Card
				shadow="sm"
				padding="lg"
				pb={"xl"}
				className="border-x-green-600"
			>
				<div>
					<p
						color="green"
						className="text-2xl font-bold mb-6 text-center #16a34a text-emerald-600"
					>
						Perago Information System
					</p>
				</div>

				<Flex
					gap={5}
					direction="column"
					justify="center"
					align="center"
				>
					<h2 className="text-xl font-semibold mb-6 text-center">
						Login
					</h2>
					{authState.error && (
						<Alert
							variant="filled"
							color="red"
							mb={"10px"}
							withCloseButton
						>
							{authState.error}
						</Alert>
					)}
					<form onSubmit={handleSubmit(onSubmit)}>
						<Flex direction="column" gap="lg" w={"100%"}>
							<TextInput
								classNames={{
									input: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
									label: "block text-sm font-medium text-gray-700",
								}}
								{...register("email")}
								label="Email"
								placeholder="Enter your Email"
								error={errors.email && errors.email.message}
							/>

							<PasswordInput
								classNames={{
									input: "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm",
									label: "block text-sm font-medium text-gray-700",
								}}
								{...register("password")}
								label="Password"
								placeholder="Enter your password"
								error={
									errors.password && errors.password.message
								}
							/>

							<Button
								type="submit"
								variant="filled"
								color="teal"
								loading={authState.isLoading}
							>
								Login
							</Button>
						</Flex>
					</form>
				</Flex>
			</Card>
		</Flex>
	);
};

export default LoginPage;
