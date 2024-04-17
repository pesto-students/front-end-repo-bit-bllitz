"use client"; // This is a client component 👈🏽

import React, { useState, useCallback, useEffect } from "react";
import ActionAreaCard from "../../../components/card/ActionAreaCard.js";
import styles from "../menu.module.scss";
import { Grid, Typography } from "@mui/material";
import CustomModal from "@/components/modal/CustomModal.js";
import CustomInput from "@/components/auth/input/CustomInput.js";
import CustomButton from "@/components/button/CustomButton.js";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase/supabase.js";
import { useAppContext } from "@/context/index.js";
import Header from "@/components/header/Header.js";
import { useDispatch } from "react-redux";
import { setSubcategory } from "@/lib/redux/slices/sidePanelSlice.js";

const Categories = () => {
  const [openModal, setOpenModal] = useState(false);
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
  const dispatch = useDispatch();

  const onClickHandle = (category) => {
    dispatch(setSubcategory(category.name));
    push(`/menu/categories/subCategories?category_id=${category.id}`);
  };
  const { setUser } = useAppContext();
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("categories data", data);
      if (data.session == null) {
        router.push("/auth/signin");
      } else {
        setUser(data);
      }
    };
    fetchSession();
  }, []);
  return (
    <>
      <Header padding={"1rem 2.5rem"} title={"Categories"} />
      <Grid container className={styles.menu}>
        {categories.map((category) => (
          <Grid item md={3} className={styles.categories}>
            <ActionAreaCard data={category} onClick={onClickHandle} />
          </Grid>
        ))}
      </Grid>
      <CustomModal openModal={openModal} onClose={() => setOpenModal(false)}>
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
