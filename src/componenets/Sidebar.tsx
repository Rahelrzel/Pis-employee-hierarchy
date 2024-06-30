import { Button, Group, Text } from "@mantine/core";
import classes from "./NavbarSimple.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth-slice";

export const Sidebar = () => {
	const dispatch = useDispatch();
	const data = [
		{ link: "/employee", label: "Home" },
		{ link: "/employee/roles", label: "Roles" },
	];
	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarMain}>
				<Group className={classes.header} justify="space-between">
					<div>
						<Text
							component="div"
							variant="gradient"
							gradient={{ from: "green", to: "cyan" }}
							className={classes.gradientText}
						>
							Perago
						</Text>
						<Text component="div" className={classes.gradientText}>
							Information
						</Text>
						<Text component="div" className={classes.gradientText}>
							System
						</Text>
					</div>
				</Group>
				{data.map((item) => (
					<Link
						className={classes.link}
						href={item.link}
						key={item.label}
					>
						<span>{item.label}</span>
					</Link>
				))}
			</div>

			<div className={classes.footer}>
				<a
					className={classes.link}
					onClick={(event) => {
						event.preventDefault();
						dispatch(logout());
					}}
				>
					<span>Logout</span>
				</a>
			</div>
		</nav>
	);
};
