"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import ActionAreaCard from "../../../../components/card/ActionAreaCard.js";
import styles from "../categories.module.scss";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const mockData = [
  {
    uri: "/images/veg_pizza.jpg",
    title: "Paneer Pizza",
    content: "",
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Veg Farm",
    content: "",
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Chicken Farm",
    content: "",
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Onion Tomato Pizza",
    content: "",
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Paneer Pizza",
    content: "",
  },
];
const SubCategories = () => {
  const [openModal, setOpenModal] = useState(true);
  const { push } = useRouter();

  const onClickHandle = () => {
    
  };

  return (
    <>
      <Typography>Categories</Typography>
      <div className={styles.menu}>
        {mockData.map((data) => (
          <ActionAreaCard
            uri={data.uri}
            title={data.title}
            content={data.content}
            onClick={undefined}
          />
        ))}
      </div>
    </>
  );
};

export default SubCategories;
