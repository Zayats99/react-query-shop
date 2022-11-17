import { useState } from "react";
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
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AgricultureIcon from "@mui/icons-material/Agriculture";
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
  { title: "About", link: "about", isActive: false }
];

function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [activeLink, setActiveLink] = useState("Home");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
            <AgricultureIcon
              fontSize="large"
              sx={{ ml: "auto", display: { sm: "none" } }}
            />

            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                // textAlign: "center"
                alignItems: "center"
              }}
            >
              React-Query
              <AgricultureIcon fontSize="large" />
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  sx={{ color: "#fff" }}
                  onClick={() => clickHandler(item)}
                >
                  {item.title}
                </Button>
              ))}
              <Button sx={{ color: "#fff" }} onClick={handleOpenModal}>
                Create
              </Button>
              <ProductModal open={openModal} handleClose={handleClose} />
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
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              React-Query
            </Typography>
            <Divider />
            <List>
              {navItems.map((item) => (
                <ListItem key={item.title} disablePadding>
                  <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => clickHandler(item)}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={handleOpenModal}
                >
                  <ListItemText primary="Create" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

export { Header };
