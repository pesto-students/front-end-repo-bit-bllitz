import { Typography } from "@mui/material";
import React from "react";
import styles from "./Logo.module.scss";
const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Typography className={styles.logo} variant="h5">
        Smart <span>POS</span>
      </Typography>
    </div>
  );
};

export default Logo;
