import React from "react";
import styles from "./BillsCard.module.scss";
import { Typography } from "@mui/material";
import { CircleRounded } from "@mui/icons-material";
const BillsCard = () => {
  return (
    <div className={styles.BillsCard}>
      <div className={styles.details}>
        <div className={styles.status}>
          <Typography className={styles.orderNo}>Order #34</Typography>
          <Typography className={styles.active}>
            <CircleRounded sx={{ fontSize: "0.6rem", color: "#0BD60B" }} />
            Active
          </Typography>
        </div>
        <Typography className={styles.orderNo}>$45</Typography>
      </div>{" "}
      <div className={styles.tableDets}>
        <Typography className={styles.table}>Table 2c</Typography>
        <CircleRounded sx={{ fontSize: "0.6rem", color: "#D9D9D9" }} />
        <Typography className={styles.table}>2 Guests</Typography>
      </div>
    </div>
  );
};

export default BillsCard;
