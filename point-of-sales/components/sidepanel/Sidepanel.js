"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dashboard, Fastfood, Receipt, Settings } from "@mui/icons-material";
import styles from "./Sidepanel.module.scss";
import Logo from "../logo/Logo";
import CustomButton from "../button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "@/lib/redux/slices/sidePanelSlice";

const SidePanel = ({ style }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sidePanel = useSelector((state) => state.sidePanel);
  console.log("sidePanel", sidePanel);
  const items = [
    {
      href: "/dashboard",
      icon: Dashboard,
      primary: "Dashboard",
    },
    { href: "/menu/categories", icon: Fastfood, primary: "Food & Drinks" },
    { href: "/bills", icon: Receipt, primary: "Bills" },
    { href: "/settings", icon: Settings, primary: "Settings" },
  ];

  const [activeTab, setActiveTab] = useState(sidePanel.selectedTab);

  const handleTabClick = (e, href) => {
    e.preventDefault();
    setActiveTab(href);
    router.push(href);
    dispatch(setSelectedTab(href));
  };
  useEffect(() => {
    console.log("active", activeTab);
  }, [activeTab]);

  return (
    <div className={styles.sidePanel}>
      <Logo />
      <List className={styles.navContainer}>
        {items.map((item, index) => (
          <ListItem
            button
            key={index}
            component="a"
            href={item.href}
            className={`${styles.navTab} ${
              activeTab === item.href ? styles.active : ""
            }`}
            onClick={(e) => handleTabClick(e, item.href)}
          >
            <ListItemIcon className={styles.icon}>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.primary} />
          </ListItem>
        ))}
      </List>
      <Card className={styles.profile} elevation={10}>
        <Avatar className={styles.avatar}>Z</Avatar>
        <Typography variant="body1" className={styles.name}>
          Theresa Web
        </Typography>
        <Typography variant="body2" className={styles.designation}>
          Waiter
        </Typography>
        <div className={styles.profileBtn}>
          <CustomButton text={"Open Profile"} />
        </div>
      </Card>
    </div>
  );
};

export default SidePanel;
