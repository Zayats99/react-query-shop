import { useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
	Typography,
	Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Container } from "@mui/system";
import { ProductModal } from "../ProductModal/ProductModal";

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
}

const drawerWidth = 240;

const navItems = [
	{ title: "Home", link: "/", isActive: true },
	{ title: "About", link: "about", isActive: false },
];

function Header(props: Props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	// const [activeLink, setActiveLink] = useState("Home");

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				React-Query
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.title} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }} onClick={() => clickHandler(item)}>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	const navigate = useNavigate();

	function clickHandler(item: any) {
		navigate(item.link);
	}

	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);

	return (
		<>
			<AppBar>
				<Container maxWidth="xl">
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
						>
							React-Query
						</Typography>
						<Box sx={{ display: { xs: "none", sm: "block" } }}>
							{navItems.map((item) => (
								<Button key={item.title} sx={{ color: "#fff" }} onClick={() => clickHandler(item)}>
									{item.title}
								</Button>
							))}
							<Button sx={{ color: "#fff" }} onClick={handleOpenModal}>
								Create
							</Button>
							<ProductModal
									open={openModal}
									handleClose={handleClose}
								/>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	);
}

export { Header };
