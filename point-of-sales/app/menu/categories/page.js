"use client"; // This is a client component 👈🏽

import React, { useState } from "react";
import ActionAreaCard from "../../../components/card/ActionAreaCard.js";
import styles from "./categories.module.scss";
import { Typography, Modal, Box, Paper } from "@mui/material";
import CustomModal from "@/components/modal/CustomModal.js";
import CustomInput from "@/components/auth/input/CustomInput.js";
import CustomButton from "@/components/button/CustomButton.js";
import { useRouter } from "next/navigation";

const mockData = [
  {
    uri: "/images/veg_pizza.jpg",
    title: "Cold Drinks",
    content: "",
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Burgers",
    content: "",
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Pizza",
    content: "",
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Desserts",
    content: "",
  },
  {
    uri: "/images/veg_pizza.jpg",
    title: "Pasta",
    content: "",
  },
];
const Categories = () => {
  const [openModal, setOpenModal] = useState(true);
  const { push } = useRouter();
  const [values, setValues] = useState({
    totalGuests : '',
    assignedTable : ''
  })

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const onClickHandle = () => {
    push('/menu/categories/subCategories')
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
            onClick={onClickHandle}
          />
        ))}
      </div>
      <CustomModal openModal={openModal}>
        <CustomInput
          placeholder={"Enter number of Guests"}
          onChange={handleUserData}
          value={values.totalGuests}
          inputName={'totalGuests'}
        />
        <CustomInput
          placeholder={"Enter table number"}
          onChange={handleUserData}
          value={values.assignedTable}
          inputName={'assignedTable'}
        />
         <CustomButton text={"Assign Table"} onClick={()=> setOpenModal(false)} />
      </CustomModal>
    </>
  );
};

export default Categories;
