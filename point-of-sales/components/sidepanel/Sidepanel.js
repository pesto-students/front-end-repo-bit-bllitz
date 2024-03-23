"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Dashboard, Fastfood, Receipt } from "@mui/icons-material";
import styles from "./Sidepanel.module.scss";
import { useRouter } from "next/navigation";
import Logo from "../logo/Logo";
import { Avatar, Button, Card, Typography } from "@mui/material";
import { supabase } from "../../supabase/supabase";
const drawerWidth = 240;

export default function PanelDrawer({ children }) {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    profileName: "",
    profileDesig: "",
  });
  const getSession = async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log("datasess", data);
    if (data.user) {
      const name = data.user.email;
      const designation = data.user.id;
      setProfileData({ profileDesig: designation, profileName: name });
    } else {
      setProfileData({ profileDesig: "", profileName: "" });
    }
  };
  useEffect(() => {
    getSession();
  }, []);
  const menuData = [
    {
      href: "/dashboard",
      icon: <Dashboard />,
      primary: "Dashboard",
    },
    { href: "/menu/categories", icon: <Fastfood />, primary: "Food & Drinks" },
    { href: "/bills", icon: <Receipt />, primary: "Bills" },
    //   { href: "/settings", icon: Settings, primary: "Settings" },
  ];
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleRoute = (href, index) => {
    setSelectedIndex(index);

    router.push(href);
    console.log("href", href);
  };
  const handleProfile = () => {
    router.push("/profile");
  };
  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          height: "100%",
          position: "relative",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Logo />
        <Box className={styles.sidePanelContainer}>
          <List className={styles.tabContainer}>
            {menuData.map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => handleRoute(text.href, index)}
                  selected={selectedIndex === index}
                  className={styles.tabBtn}
                >
                  <ListItemIcon className={styles.icon}>
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText
                    className={styles.tabTxt}
                    primary={text.primary}
                    disableTypography
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {profileData.profileName && (
            <Box className={styles.profileSection}>
              <Card elevation={2} className={styles.profileCard}>
                <Avatar src={'/images/avatar.png'} className={styles.avatar}>Z</Avatar>
                <Typography variant="h6" className={styles.profileName}>
                  {/* {profileData.profileName} */}
                  Riya Pathak
                </Typography>
                <Typography variant="body2" className={styles.desig}>
                  {/* {profileData.profileDesig} */}
                  Waiter
                </Typography>
                <Button onClick={handleProfile} className={styles.profileBtn}>
                  Show Profile
                </Button>
              </Card>
            </Box>
          )}
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Toolbar /> */}
        {children}
      </Box>
    </Box>
  );
}
