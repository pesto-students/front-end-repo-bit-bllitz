import React from "react";
import styles from "./Header.module.scss";
import { Typography } from "@mui/material";
import { useAppContext } from "@/context";
const Header = ({ title,padding }) => {
  
  return (
    <div style={{padding:padding}}> 
      <Typography className={styles.header} variant="h6">{title}</Typography>
    </div>
  );
};

export default Header;
