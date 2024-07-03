"use client";
import React, { useState } from "react";
import TreeComponent from "@/componenets/folderNode";
import { Button, Title } from "@mantine/core";

function MainPage() {
	return (
		<div className="flex-1 pl-10 pr-20 py-12">
			<Title className="text-green-500" mb={"md"}>
				Employee Tree
			</Title>
			<TreeComponent />
		</div>
	);
}

export default MainPage;
