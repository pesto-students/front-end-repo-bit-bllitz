"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import ActionAreaCard from "../../../../components/card/ActionAreaCard.js";
import styles from "../../menu.module.scss";
import { Typography, Drawer } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image.js";
import CustomButton from "@/components/button/CustomButton.js";

const mockData = [
  {
    uri: "/images/veg_pizza.jpg",
    title: "Paneer Pizza",
    content: "",
    metaData: {
      quantity: "650 gm",
      price: "450 Rs",
    },
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Veg Farm",
    content: "",
    metaData: {
      quantity: "650 gm",
      price: "450 Rs",
    },
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Chicken Farm",
    content: "",
    metaData: {
      quantity: "650 gm",
      price: "450 Rs",
    },
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Onion Tomato Pizza",
    content: "",
    metaData: {
      quantity: "650 gm",
      price: "450 Rs",
    },
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Paneer Pizza",
    content: "",
    metaData: {
      quantity: "650 gm",
      price: "450 Rs",
    },
  },
];
const SubCategories = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [foodData, setFoodData] = useState({
    uri: "",
    title: "",
    content: "",
    metaData: {
      quantity: "",
      price: "",
    },
  });
  const { push } = useRouter();

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

  return (
    <>
      <Typography>Food Items</Typography>
      <div className={styles.menu}>
        {mockData.map((data) => (
          <ActionAreaCard data={data} onClick={onClickHandle} />
        ))}
      </div>
      <Drawer anchor={"right"} open={openDrawer} onClose={toggleDrawer(false)}>
        <div className={styles.drawer}>
          <Image
            className={styles.image}
            src={foodData.uri}
            width={200}
            height={180}
          />
          <Typography className={styles.title} variant="h4">
            {foodData.title}
          </Typography>
          <Typography className={styles.quantity} variant="h6">
            {foodData.metaData.quantity}
          </Typography>
          <Typography className={styles.price} variant="h5">
            {foodData.metaData.price}
          </Typography>
          <div className={styles.applyButton}>
          <CustomButton text={"Apply"} onClick={() => setOpenDrawer(false)} />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default SubCategories;
