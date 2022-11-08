import { Outlet } from "react-router-dom";
import { Header } from "../components";

import { Container } from "@mui/material";

function MainLayout() {
	return (
		<>
			<Header />
			<Container maxWidth="xl" sx={{ pt: 12, minHeight: "100vh" }}>
				<Outlet />
			</Container>
		</>
	);
}

export { MainLayout };
