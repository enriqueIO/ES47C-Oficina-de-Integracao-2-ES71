"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  School,
  People,
  Work,
  ExpandMore,
  ExpandLess,
  Home,
} from "@mui/icons-material";
import Image from "next/image";
import styles from "./Sidebar.module.css";
import { Divider } from "@mui/material";

const drawerWidth = 240;

export function Sidebar() {
  const [openTeachers, setOpenTeachers] = React.useState(false);
  const [openStudents, setOpenStudents] = React.useState(false);
  const [openWorkshops, setOpenWorkshops] = React.useState(false);

  const toggleSubmenu = (menu: string) => {
    if (menu === "teachers") {
      setOpenTeachers(!openTeachers);
    } else if (menu === "students") {
      setOpenStudents(!openStudents);
    } else if (menu === "workshops") {
      setOpenWorkshops(!openWorkshops);
    }
  };

  const redirectToPage = (page: string) => {
    window.location.replace(page);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "lightskyblue",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar className={styles.toolbar}>
          <Image
            src="/images/logoEllp.png"
            alt="Logo do Ellp"
            width={150}
            height={150}
            className={styles.logo}
          />
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => redirectToPage("/portal")}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary={"Página inicial"} />
            </ListItemButton>
          </ListItem>

          {/* Professores */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleSubmenu("teachers")}>
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary={"Professores"} />
              {openTeachers ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          {openTeachers && (
            <List className={styles.subMenu}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => redirectToPage("/portal/registerTeacher")}
                >
                  <ListItemText primary={"Cadastrar"} />
                </ListItemButton>
              </ListItem>
            </List>
          )}

          {/* Alunos */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleSubmenu("students")}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={"Alunos"} />
              {openStudents ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          {openStudents && (
            <List className={styles.subMenu}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => redirectToPage("/portal/registerStudent")}
                >
                  <ListItemText primary={"Cadastrar"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => redirectToPage("/portal/manageStudent")}
                >
                  <ListItemText primary={"Gerenciar"} />
                </ListItemButton>
              </ListItem>
            </List>
          )}

          {/* Workshops */}
          <ListItem disablePadding>
            <ListItemButton onClick={() => toggleSubmenu("workshops")}>
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText primary={"Workshops"} />
              {openWorkshops ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          {openWorkshops && (
            <List className={styles.subMenu}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => redirectToPage("/portal/registerWorkshop")}
                >
                  <ListItemText primary={"Cadastrar"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => redirectToPage("/portal/manageWorkshop")}
                >
                  <ListItemText primary={"Gerenciar"} />
                </ListItemButton>
              </ListItem>
            </List>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
