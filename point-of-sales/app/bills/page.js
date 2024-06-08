"use client";
import React, { useState, useEffect } from "react";
import styles from "./bills.module.scss";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import BillsCard from "@/components/billsCard/BillsCard";
import { supabase } from "../../supabase/supabase";
import Loading from "@/components/loading/Loading";

const PAYMENT_STATUS_COMPLETED = "completed";
const PAYMENT_STATUS_ACTIVE = "active";

const Bills = () => {
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentValue, setValue] = useState("");
  const [paymentDone, setPaymentStatus] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(undefined);
  const [orderItems, setOrderItems] = useState([]);

  const getAllOrders = async () => {
    setLoading(true);
    try {
      let { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("waiter_id", user.id);

      setOrders(orders);
      setSelectedOrder(orders[0]);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (user) {
      getAllOrders();
    }
  }, [user]);

  const getOrderDetails = async () => {
    try {
      let { data: order_items, error } = await supabase
        .from("order_items")
        .select(
          `
            quantity,
            food_item (
              name,
              price,
              image_url
            )
      `
        )
        .eq("order_id", selectedOrder.order_id);

      setOrderItems(order_items);
      setLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    if (selectedOrder) {
      getOrderDetails();
    }
  }, [selectedOrder]);

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
        img: "/images/burger.png",
        quantity: 1,
        price: 450,
        name: "Hamburger",
      },
      {
        img: "/images/burger.png",
        quantity: 1,
        price: 450,
        name: "Pizza",
      },
      {
        img: "/images/burger.png",
        quantity: 1,
        price: 450,
        name: "Hamburger",
      },
      {
        img: "/images/burger.png",
        quantity: 1,
        price: 450,
        name: "Pizza",
      },
      {
        img: "/images/burger.png",
        quantity: 1,
        price: 450,
        name: "Hamburger",
      },
      {
        img: "/images/burger.png",
        quantity: 1,
        price: 450,
        name: "Pizza",
      },
      {
        img: "/images/burger.png",
        quantity: 1,
        price: 450,
        name: "Hamburger",
      },
      {
        img: "/images/burger.png",
        quantity: 1,
        price: 450,
        name: "Pizza",
      },
    ],
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  };
  const handlePaymentMethod = () => {
    console.log(paymentValue);
    switch (paymentValue) {
      case "UPI":
        //upi logic
        setPaymentModal(false);

        break;
      case "Cash":
        setPaymentStatus(true);
        setPaymentModal(false);

        break;
      default:
        break;
    }
  };
  const handleChange = (eve) => {
    setValue(eve.target.value);
  };

  const onOrderClickHandle = (order) => {
    setSelectedOrder(order);
  };
  return loading ? (
    <Loading />
  ) : (
    <div className={styles.bills}>
      {selectedOrder && (
        <Grid container>
          <Grid item md={6}>
            <Typography className={styles.billsHead}>Bills</Typography>
            {orders.map((order, index) => (
              <BillsCard
                key={index}
                order={order}
                onClick={onOrderClickHandle}
              />
            ))}
          </Grid>
          <Grid item md={5} className={styles.details}>
            <div className={styles.header}>
              <Typography className={styles.orderNo}>
                Order #{selectedOrder.order_id}
              </Typography>
              {selectedOrder.status === PAYMENT_STATUS_ACTIVE ? (
                <div className={paymentDone ? styles.completed : styles.active}>
                  {paymentDone ? "Completed" : "Active"}
                </div>
              ) : (
                <div className={styles.completed}>Completed</div>
              )}
            </div>
            <Divider />
            <div className={styles.detailsContainer}>
              <Typography variant="body2" className={styles.head}>
                Details
              </Typography>
              <div className={styles.customerDets}>
                <div item md={2}>
                  <Typography className={styles.title}>Table</Typography>
                  <Typography className={styles.sub}>
                    {currentOrderDetails.guest.tableNumber}
                  </Typography>
                </div>
                <div item md={2}>
                  <Typography className={styles.title}>Guests</Typography>
                  <Typography className={styles.sub}>
                    {currentOrderDetails.guest.totalGuests}
                  </Typography>
                </div>
                <div item md={5}>
                  <Typography className={styles.title}>Customer</Typography>
                  <Typography className={styles.sub}>
                    {currentOrderDetails.guest.name}
                  </Typography>
                </div>
                <div item md={3}>
                  <Typography className={styles.title}>Payment</Typography>
                  <Typography className={styles.sub}>
                    {currentOrderDetails.total_amount}
                  </Typography>
                </div>
              </div>
              <div className={styles.orderInfo}>
                <Typography className={styles.head}>Order Info</Typography>
                <div className={styles.orderTable}>
                  <Typography className={styles.subs}>Item</Typography>
                  <Typography className={styles.subs}>Price</Typography>
                </div>

                <div className={styles.scrollable}>
                  {orderItems.map((item, index) => (
                    <Grid container className={styles.orderCard} key={index}>
                      <Grid item md={7} className={styles.nameContainer}>
                        <div className={styles.imgContainer}>
                          <img src={item.food_item.image_url} />
                        </div>
                        <Typography className={styles.foodItem}>
                          {" "}
                          {item.quantity}x{item.food_item.name}
                        </Typography>
                      </Grid>
                      <Grid item md={5} className={styles.price}>
                        Rs {item.quantity * item.food_item.price}
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </div>
              <div className={styles.bottomBar}>
                <div className={styles.grandtotal}>
                  <Typography className={styles.total}>Total</Typography>
                  <Typography className={styles.total}>
                    {selectedOrder.total_amount} Rs
                  </Typography>
                </div>
                <Button
                  className={paymentDone ? styles.paidBtn : styles.chargeBtn}
                  onClick={() => setPaymentModal(true)}
                >
                  {paymentDone ||
                  selectedOrder.status === PAYMENT_STATUS_COMPLETED
                    ? `Successfully Paid ${selectedOrder?.total_amount}`
                    : `Charge customer Rs ${selectedOrder?.total_amount}`}
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      )}

      {paymentModal && (
        <Modal
          open={paymentModal}
          onClose={() => setPaymentModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className={styles.paymentModal}
        >
          <Box sx={style}>
            <FormControl>
              <FormLabel
                className={styles.heading}
                id="demo-radio-buttons-group-label"
              >
                Choose Payment method
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="UPI"
                name="radio-buttons-group"
                onChange={handleChange}
              >
                <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                <FormControlLabel
                  value="Cash"
                  control={<Radio />}
                  label="Cash"
                />
              </RadioGroup>
            </FormControl>
            <Button
              className={styles.btn}
              onClick={() => handlePaymentMethod()}
            >
              Apply
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Bills;
