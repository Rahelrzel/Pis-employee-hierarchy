"use client";
import { Sidebar } from "@/componenets/Sidebar";
import { RootState } from "@/redux/store";
import { Flex } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Layout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const { user } = useSelector((state: RootState) => state.authReducer);

	useEffect(() => {
		if (!user) {
			router.push("/");
		}
	}, [user, router]);

	if (!user) {
		return <></>;
	}

	return (
		<>
			<Flex style={{ minHeight: "100vh" }}>
				<Sidebar />
				{children}
			</Flex>
		</>
	);
}
