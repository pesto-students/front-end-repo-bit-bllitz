"use client";
import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import Header from "@/components/header/Header";
import { supabase } from "../../supabase/supabase";
import { useAppContext } from "@/context";
import { selectCartItems } from "@/lib/redux/selectors/cardSelector";
const { v4: uuidv4 } = require("uuid");
import orderSlice, { generateOrder } from "@/lib/redux/slices/orderSlice";
import {store} from "@/lib/redux/store"
import {
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import { ArrowRightAlt, Cancel, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "@/lib/redux/slices/cartSlice";

let cartItems=[];
let orderId=0;
let cart=[];
const page = () => {
   cart=useSelector((state) => state.cart.items);
   console.log(cart);
  cartItems=cart;
  const dispatch = useDispatch();
  const { user, setUser } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    console.log("data in cart", data);
    setUser(data);
  };
  function calculateTotal() {
     let total = 0;
    cart.forEach((item) => {
      total += item.amount;
    });
    setTotal(total);
  }
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    console.log('quantyiy',quantity);
    calculateTotal();
  }, [cart]);

  const handleQuantity = (e, type, itemId) => {
    e.preventDefault();
    switch (type) {
      case "decrease":
        dispatch(decreaseQuantity(itemId));
        break;
      case "increase":
        dispatch(increaseQuantity(itemId));
        break;
      default:
        break;
    }
  };
  const placeOrder =  async () => {
    
    
      const{ data:user ,error:usererror}= await supabase.auth.getUser();
      
      console.log(user);
      orderId=orderId+1
      // const orderId = uuidv4()
      console.log(orderId);
      console.log(cartItems);
     
      
       // Dispatch action to generate order
       

      // Insert order into Supabase
      const { error } = await supabase
        .from("orders")
        .insert([
          {
            order_id: orderId,
            waiter_id: user.user.id,
            total_amount: 120,
            created_at: new Date(),
            updated_at: null,
            status: "active",
          },
        ]);
        if(error){
          throw error
        }
        await updateOrderItem(orderId);
  };
  
  const updateOrderItem=async (orderId)=>{
    cartItems.map((item) => {
     
      insertFoodItem(orderId,item.id,1)
      
    });
  }
  const insertFoodItem=async(orderId,food_id,quantity)=>{
     await supabase
        .from("order_items")
        .insert({ order_id: orderId, food_id: food_id, quantity: 1 });

  }
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className={styles.cart}>
      {cart.length > 0 ? (
        <>
          <Header title={"Cart"} />
          <Grid container className={styles.headerWrap}>
            <Grid item md={6} xs={12} sm={12}>
              <Typography variant="h6" className={styles.msg}>
                You have <span>{cart.length} items</span> in your cart
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sm={12}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button
                startIcon={<Delete />}
                variant="contained"
                className={styles.clear}
                onClick={handleClearCart}
              >
                Clear cart
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={8}>
              <div className={styles.cartItemsContainer}>
                {cart.map((item) => (
                  <>
                    <Grid container className={styles.cartItems}>
                      <Grid item md={1.5} xs={4} sm={4}>
                        <Card
                          component={"image"}
                          sx={{ minWidth: 200, flexGrow: 1 }}
                        >
                          <CardMedia
                            component="img"
                            sx={{ borderRadius: 2 }}
                            height="100%"
                            image={item.image_url}
                          />
                        </Card>
                      </Grid>
                      <Grid item md={5.5}>
                        <Typography variant="body2" className={styles.food}>
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item md={2} className={styles.quantityContainer}>
                        <ButtonGroup
                          variant="outlined"
                          className={styles.btnGroup}
                        >
                          <Button
                            className={styles.quantityCount}
                            onClick={(e) =>
                              handleQuantity(e, "decrease", item.id)
                            }
                          >
                            -
                          </Button>
                          <Button className={styles.quantity}>
                            {item.quantity}
                          </Button>
                          <Button
                            className={styles.quantityCount}
                            onClick={(e) =>
                              handleQuantity(e, "increase", item.id)
                            }
                          >
                            +
                          </Button>
                        </ButtonGroup>
                      </Grid>
                      <Grid item md={2} className={styles.priceContainer}>
                        <Typography variant="body2" className={styles.price}>
                          ₹ {item.price * item.quantity}
                        </Typography>
                      </Grid>
                      <Grid item md={1} className={styles.cancel}>
                        <Button
                          variant="text"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Cancel />
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider sx={{ width: "100%", marginBottom: 1 }} />
                  </>
                ))}
              </div>
            </Grid>
            <Grid item md={4} className={styles.totalContainer}>
              <Grid container className={styles.grandTotal}>
                <Grid item md={6}>
                  Total
                </Grid>
                <Grid item md={6} display={"flex"} justifyContent={"flex-end"}>
                  ₹ {total}
                </Grid>
              </Grid>
              <Button
                variant="contained"
                endIcon={<ArrowRightAlt />}
                className={styles.order}
                onClick={placeOrder}

              >
                Place Order
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <div className={styles.empty}>
          <ShoppingCart />
          <Typography className={styles.info}>Your cart is empty!</Typography>
        </div>
      )}
    </div>
  );
};

export default page;
