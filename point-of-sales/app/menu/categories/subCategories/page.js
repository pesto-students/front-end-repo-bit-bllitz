"use client"; // This is a client component 👈🏽

import React, { useState, useCallback, useEffect } from "react";
import ActionAreaCard from "../../../../components/card/ActionAreaCard.js";
import styles from "../../menu.module.scss";
import { Typography, Drawer } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image.js";
import CustomButton from "@/components/button/CustomButton.js";
import { supabase } from "../../../../supabase/supabase.js";
import { addToCart } from "@/lib/redux/slices/cartSlice.js";

const SubCategories = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const searchParams = useSearchParams();
  const category_id = searchParams.get("category_id");
  const [foodData, setFoodData] = useState({
    image_url: "",
    name: "",
    quantity: "",
    price: "",
  });
  const { push } = useRouter();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFoodItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("food_item")
        .select("*")
        .eq("category_id", category_id);

      if (error) {
        throw error;
      }

      if (data) {
        setFoodItems(data);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getFoodItems();
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenDrawer(open);
  };

  const onClickHandle = (data) => {
    setFoodData(data);
    setOpenDrawer(true);
  };

  const onApplyAddToCart = () => {
    try {
      // Dispatch action to add item to cart
      store.dispatch(addToCart(item));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography>Food Items</Typography>
      <div className={styles.menu}>
        {foodItems.map((data) => (
          <ActionAreaCard data={data} onClick={onClickHandle} />
        ))}
      </div>
      <Drawer anchor={"right"} open={openDrawer} onClose={toggleDrawer(false)}>
        <div className={styles.drawer}>
          <Image
            unoptimized
            className={styles.image}
            src={foodData.image_url}
            alt={"food_image"}
            width={200}
            height={180}
          />
          <Typography className={styles.title} variant="h4">
            {foodData.name}
          </Typography>
          <Typography className={styles.quantity} variant="h6">
            {foodData?.quantity}
          </Typography>
          <Typography className={styles.price} variant="h5">
            {foodData.price}
          </Typography>
          <div className={styles.applyButton}>
            <CustomButton text={"Apply"} onClick={onApplyAddToCart} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SubCategories;
