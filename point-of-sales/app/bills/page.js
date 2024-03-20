"use client"; // This is a client component 👈🏽

import {
  Box,
  Button,
  Divider,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";
import styles from "./bills.module.scss";
import React from "react";
import Chip from "../../components/chip/Chip.js";
import CustomButton from "@/components/button/CustomButton";

const Bills = () => {
  return (
    <>
      <div className={styles.billContainer}>
        <Box className={styles.orderBox}>
          <Chip name={"Order#35"} price={"450Rs"} />
          <Chip name={"Order#35"} price={"450Rs"} />
        </Box>
        <Box className={styles.box}>
          <div>
            <Typography variant="h6">Payment History</Typography>
            <Typography variant="h5">
              Order#35
              <Button className={styles.statusButton} variant="contained">
                Active
              </Button>
              <Divider className={styles.divider} />
            </Typography>
            <Typography variant="h6">Details</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="right">Guest No.</TableCell>
                    <TableCell align="right">Table No.</TableCell>
                    <TableCell align="right">Payment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={styles.row}>
                    <TableCell component="th" scope="row">
                      Kate Willson
                    </TableCell>
                    <TableCell align="right">2</TableCell>
                    <TableCell align="right">2</TableCell>
                    <TableCell align="right">By Cash</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6">Order Info</Typography>
            <Chip name={"1xHamburger"} price={"450Rs"} />
          </div>
          <>
            <CustomButton text={"Charger Customer 450Rs"} />
          </>
        </Box>
      </div>
    </>
  );
};

export default Bills;
