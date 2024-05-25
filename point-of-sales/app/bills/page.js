"use client"; // This is a client component 👈🏽
import {
  Box,
  Divider,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Chip,
} from "@mui/material";
import styles from "./bills.module.scss";
import React, { useState } from "react";
import CustomChip from "../../components/chip/CustomChip.js";
import CustomButton from "@/components/button/CustomButton";
import { supabase } from "../../supabase/supabase";
import { useSelector} from "react-redux";
import { useEffect,useState } from "react";




// const mockOrders = [
//   {
//     order_id: "Order#35",
//     price: "450Rs",
//   },
//   {
//     order_id: "Order#34",
//     price: "650Rs",
//   },
//   {
//     order_id: "Order#33",
//     price: "350Rs",
//   },
// ];

const currentOrderDetails = {
  order_id: " Order#35",
  status: "Active",
  guest: {
    name: "Kate Willson",
    totalGuests: 2,
    tableNumber: 5,
    paymentType: "Cash",
  },
  total_amount: "900Rs",
  orders: [
    {
      quantity: 1,
      price: "450Rs",
      name: "Hamburger",
    },
    {
      quantity: 1,
      price: "450Rs",
      name: "Pizza",
    },
  ],
};


const Bills = () => {
  const [mockOrders, setmockOrders] = useState([{
    order_id: "",
    total_amount:"" 
  }]);
  const initializeOrder= async ()=>{
    const {data:user,error:error}=await supabase.auth.getUser();
  console.log(user);
  const {data:orders,error:ordererror}= await supabase.from("orders").select("*").eq('waiter_id',user.user.id);
  setmockOrders(orders)
  console.log(mockOrders);
  
  }

  useEffect(() => {
    initializeOrder();
  }, []);
  

 
  
  


  return (
    <>
      <Header padding={"1rem 2.5rem"} title={"Bills"} />
      <div className={styles.billContainer}>
        <Box className={styles.orderBox}>
          {mockOrders.map((order) => (
            <CustomChip name={"Order#"+order.order_id} price={order.total_amount} />
          ))}
        </Box>
        <Box className={styles.box}>
          <div>
            <Typography variant="subtitle1" fontWeight={"500"}>
              Payment History
            </Typography>
            <Typography variant="h5" className={styles.section}>
              {currentOrder.order_id}
              <Chip
                className={styles.statusButton}
                variant="contained"
                label={currentOrder.status}
              />
              <Divider className={styles.divider} />
            </Typography>
            <Typography variant="h6" className={styles.section}>
              Details
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className={styles.tableHeader}>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="right">Guest No.</TableCell>
                    <TableCell align="right">Table No.</TableCell>
                    <TableCell align="right">Payment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow className={styles.row}>
                    <TableCell component="th" scope="row">
                      {currentOrder.guest.name}
                    </TableCell>
                    <TableCell align="right">
                      {currentOrder.guest.totalGuests}
                    </TableCell>
                    <TableCell align="right">
                      {currentOrder.guest.tableNumber}
                    </TableCell>
                    <TableCell align="right">
                      {currentOrder.guest.paymentType}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" className={styles.section}>
              Order Info
            </Typography>
            {currentOrder.orders.map((order) => (
              <CustomChip
                key={order.order_id}
                name={`${order.quantity} x ${order.name}`}
                price={order.price}
                onClick={undefined}
              />
            ))}
          </div>
          <CustomButton
            text={`Charge Customer ${currentOrder.total_amount}`}
          />
        </Box>
      </div>
    </>
  );
};

export default Bills;
