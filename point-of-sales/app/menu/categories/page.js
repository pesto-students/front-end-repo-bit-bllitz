"use client"; // This is a client component 👈🏽

import React, { useState, useCallback, useEffect } from "react";
import ActionAreaCard from "../../../components/card/ActionAreaCard.js";
import styles from "../menu.module.scss";
import { Typography } from "@mui/material";
import CustomModal from "@/components/modal/CustomModal.js";
import CustomInput from "@/components/auth/input/CustomInput.js";
import CustomButton from "@/components/button/CustomButton.js";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase/supabase.js";

const Categories = () => {
  const [openModal, setOpenModal] = useState(true);
  const { push } = useRouter();
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    totalGuests: "",
    assignedTable: "",
  });
  const [loading, setLoading] = useState(false);

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCategories = useCallback(async () => {
    try {
      setLoading(true);
      const { data: category, error } = await supabase
        .from("category")
        .select("*");

      if (error) {
        throw error;
      }

      if (category) {
        setCategories(category);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getCategories();
  }, []);

  const onClickHandle = (category) => {
    push(`/menu/categories/subCategories?category_id=${category.id}`);
  };

  return (
    <>
      <Typography>Categories</Typography>
      <div className={styles.menu}>
        {categories.map((category) => (
          <ActionAreaCard data={category} onClick={onClickHandle} />
        ))}
      </div>
      <CustomModal openModal={openModal}>
        <CustomInput
          placeholder={"Enter number of Guests"}
          onChange={handleUserData}
          value={values.totalGuests}
          inputName={"totalGuests"}
        />
        <CustomInput
          placeholder={"Enter table number"}
          onChange={handleUserData}
          value={values.assignedTable}
          inputName={"assignedTable"}
        />
        <CustomButton
          text={"Assign Table"}
          onClick={() => setOpenModal(false)}
        />
      </CustomModal>
    </>
  );
};

export default Categories;
